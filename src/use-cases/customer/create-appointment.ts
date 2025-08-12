import { Weekday } from "@prisma/client";
import type { AppointmentRepository } from "@/repositories/appointment-repository";
import type { BarberAvailabilityRepository } from "@/repositories/barber-availability-repository";
import type { RoleRepository } from "@/repositories/role-repository";
import type { ServiceRepository } from "@/repositories/service-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { Appointment } from "@/types";
import { BarberUnavailableError } from "../errors/barber-unavailable-error";
import { InvalidAppointmentDateError } from "../errors/invalid-appointment-date-error";
import { NotFoundServiceError } from "../errors/not-found-service-error";
import { ServiceInactiveError } from "../errors/service-inactive-error";
import { TimeConflictError } from "../errors/time-conflict-error";
import { TimeNotAvailableError } from "../errors/time-not-available-error";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { UserRoleError } from "../errors/user-role-error";

interface CreateAppointmentUseCaseRequest {
	customerId: string;
	serviceId: string;
	barberId: string;
	appointmentDateTime: Date;
}

interface CreateAppointmentUseCaseResponse {
	appointment: Appointment;
}

export class CreateAppointmentUseCase {
	constructor(
		private userRepository: UserRepository,
		private serviceRepository: ServiceRepository,
		private roleRepository: RoleRepository,
		private barberAvailabilityRepository: BarberAvailabilityRepository,
		private appointmentRepository: AppointmentRepository,
	) {}

	async execute({
		customerId,
		serviceId,
		barberId,
		appointmentDateTime,
	}: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
		// Validar Id do Customer
		const customer = await this.userRepository.findById(customerId);
		if (!customer) {
			throw new UserNotFoundError();
		}

		// Validar Id do Service
		const service = await this.serviceRepository.findById(serviceId);
		if (!service) {
			throw new NotFoundServiceError();
		}
		if (!service.active) {
			throw new ServiceInactiveError();
		}

		// Validar Id e roles do Barber
		const barber = await this.userRepository.findById(barberId);
		if (!barber) {
			throw new UserNotFoundError();
		}

		const barberRoles = await this.roleRepository.findByUserId(barber.id);
		const hasBarberRoles = barberRoles.some((role) => role.name === "BARBER");
		if (!hasBarberRoles) {
			throw new UserRoleError();
		}

		// Validar data/hora
		if (appointmentDateTime <= new Date()) {
			throw new InvalidAppointmentDateError();
		}

		// Validar disponibilidade do barbeiro
		const weekday = [
			Weekday.SUNDAY,
			Weekday.MONDAY,
			Weekday.TUESDAY,
			Weekday.WEDNESDAY,
			Weekday.THURSDAY,
			Weekday.FRIDAY,
			Weekday.SATURDAY,
		][appointmentDateTime.getDay()];

		const availability =
			await this.barberAvailabilityRepository.findByBarberIdAndWeekday(
				barber.id,
				weekday,
			);
		if (!availability) {
			throw new BarberUnavailableError();
		}

		const [startHour, startMinute] = availability.startTime
			.split(":")
			.map(Number);
		const [endHour, endMinute] = availability.endTime.split(":").map(Number);

		const startAvailable = new Date(appointmentDateTime);
		startAvailable.setHours(startHour, startMinute, 0, 0);

		const endAvailable = new Date(appointmentDateTime);
		endAvailable.setHours(endHour, endMinute, 0, 0);

		if (
			appointmentDateTime < startAvailable ||
			appointmentDateTime >= endAvailable
		) {
			throw new TimeNotAvailableError();
		}

		// Verificar conflitos com outros appointments

		const appointments = await this.appointmentRepository.findByBarberAndDate(
			barber.id,
			appointmentDateTime,
		);

		const appointmentStart = appointmentDateTime.getTime();
		const appointmentEnd = appointmentStart + service.duration * 60 * 1000;

		for (const appt of appointments) {
			const apptStart = appt.appointmentDate.getTime();
			const apptEnd = apptStart + service.duration * 60 * 1000;

			if (appointmentStart < apptEnd && appointmentEnd > apptStart) {
				throw new TimeConflictError();
			}
		}

		const appointment = await this.appointmentRepository.create({
			customerId: customer.id,
			serviceId: service.id,
			barberId: barber.id,
			appointmentDate: appointmentDateTime,
		});

		return {
			appointment: {
				id: appointment.id,
				customerId: customer.id,
				customerName: customer.name,
				barberId: barber.id,
				barberName: barber.name,
				serviceId: service.id,
				serviceName: service.name,
				serviceDescription: service.description,
				serviceDuration: service.duration,
				servicePrice: service.price,
				status: appointment.status,
				appointmentDateTime: appointment.appointmentDate.toISOString(),
				canceledReason: appointment.canceledReason,
			},
		};
	}
}
