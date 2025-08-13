import type { AppointmentRepository } from "@/repositories/appointment-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { Appointment } from "@/types";
import { AppointmentNotReschedulablePermissionError } from "../errors/appointment-not-reschedulable-permission-error";
import { AppointmentNotReschedulableStatusError } from "../errors/appointment-not-reschedulable-status-error";
import { InvalidAppointmentDateError } from "../errors/invalid-appointment-date-error";
import { NotFoundAppointmentError } from "../errors/not-found-appointment-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface RescheduleAppointmentUseCaseRequest {
	appointmentId: string;
	newAppointmentDate: Date;
	customerId: string;
}

interface RescheduleAppointmentUseCaseResponse {
	appointment: Appointment;
}

export class RescheduleAppointmentUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private userRepository: UserRepository,
	) {}

	async execute({
		appointmentId,
		newAppointmentDate,
		customerId,
	}: RescheduleAppointmentUseCaseRequest): Promise<RescheduleAppointmentUseCaseResponse> {
		const appointment =
			await this.appointmentRepository.findById(appointmentId);
		if (!appointment) {
			throw new NotFoundAppointmentError();
		}

		const customer = await this.userRepository.findById(customerId);
		if (!customer) {
			throw new UserNotFoundError();
		}

		const canReschedule = appointment.customerId === customer.id;
		if (!canReschedule) {
			throw new AppointmentNotReschedulablePermissionError();
		}

		if (appointment.status !== "CONFIRMED") {
			throw new AppointmentNotReschedulableStatusError();
		}

		const now = new Date();
		if (newAppointmentDate <= now) {
			throw new InvalidAppointmentDateError();
		}

		const isBarberAvailable =
			await this.appointmentRepository.isBarberAvailable(
				appointment.barberId,
				newAppointmentDate,
				appointmentId,
			);
	}
}
