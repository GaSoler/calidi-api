import type { CancelReason } from "@prisma/client";
import type { AppointmentRepository } from "@/repositories/appointment-repository";
import type { ServiceRepository } from "@/repositories/service-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { Appointment } from "@/types";
import { AppointmentNotCancelablePermissionError } from "../errors/appointment-not-cancelable-permission-error";
import { AppointmentNotCancelableStatusError } from "../errors/appointment-not-cancelable-status-error";
import { AppointmentNotCancelableTimeError } from "../errors/appointment-not-cancelable-time-error";
import { NotFoundAppointmentError } from "../errors/not-found-appointment-error";
import { NotFoundServiceError } from "../errors/not-found-service-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface CancelAppointmentUseCaseRequest {
	appointmentId: string;
	customerId: string;
	reason: CancelReason;
}

interface CancelAppointmentUseCaseResponse {
	appointment: Appointment | null;
}

export class CancelAppointmentUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private userRepository: UserRepository,
		private serviceRepository: ServiceRepository,
	) {}

	async execute({
		appointmentId,
		customerId,
		reason,
	}: CancelAppointmentUseCaseRequest): Promise<CancelAppointmentUseCaseResponse> {
		const appointment =
			await this.appointmentRepository.findById(appointmentId);
		if (!appointment) {
			throw new NotFoundAppointmentError();
		}

		const customer = await this.userRepository.findById(customerId);
		if (!customer) {
			throw new UserNotFoundError();
		}

		const canCancel = appointment.customerId === customer.id;
		if (!canCancel) {
			throw new AppointmentNotCancelablePermissionError();
		}

		if (appointment.status !== "CONFIRMED") {
			throw new AppointmentNotCancelableStatusError();
		}

		const now = new Date();
		const appointmentDate = new Date(appointment.appointmentDate);

		const diffMs = appointmentDate.getTime() - now.getTime();
		const twoHoursMs = 2 * 60 * 60 * 1000;

		if (diffMs <= twoHoursMs) {
			throw new AppointmentNotCancelableTimeError();
		}

		const service = await this.serviceRepository.findById(
			appointment.serviceId,
		);
		if (!service) {
			throw new NotFoundServiceError();
		}
		const barber = await this.userRepository.findById(appointment.barberId);
		if (!barber) {
			throw new UserNotFoundError();
		}

		const canceledAppointment = await this.appointmentRepository.cancel(
			appointmentId,
			reason,
		);

		if (!canceledAppointment) {
			return {
				appointment: null,
			};
		}

		return {
			appointment: {
				id: canceledAppointment.id,
				customerId: customer.id,
				customerName: customer.name,
				barberId: barber.id,
				barberName: barber.name,
				serviceId: service.id,
				serviceName: service.name,
				serviceDescription: service.description,
				serviceDuration: service.duration,
				servicePrice: service.price,
				status: canceledAppointment.status,
				appointmentDateTime: canceledAppointment.appointmentDate.toISOString(),
				canceledReason: canceledAppointment.canceledReason,
			},
		};
	}
}
