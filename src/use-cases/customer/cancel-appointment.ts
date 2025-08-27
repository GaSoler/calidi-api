import type { CancelReason } from "@prisma/client";
import type { AppointmentRepository } from "@/repositories/appointment-repository";
import type { ServiceRepository } from "@/repositories/service-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { AppointmentWithRelations } from "@/types";
import { AppointmentAlreadyCanceledError } from "../errors/appointment-already-canceled-error";
import { AppointmentNotCancelablePermissionError } from "../errors/appointment-not-cancelable-permission-error";
import { AppointmentNotCancelableStatusError } from "../errors/appointment-not-cancelable-status-error";
import { AppointmentNotCancelableTimeError } from "../errors/appointment-not-cancelable-time-error";
import { NotFoundAppointmentError } from "../errors/not-found-appointment-error";
import { NotFoundServiceError } from "../errors/not-found-service-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface CancelAppointmentUseCaseRequest {
	appointmentId: string;
	customerId: string;
	reason?: CancelReason;
}

interface CancelAppointmentUseCaseResponse {
	appointment: AppointmentWithRelations;
}

export class CancelAppointmentUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private userRepository: UserRepository,
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

		if (appointment.status === "CANCELED") {
			throw new AppointmentAlreadyCanceledError();
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
		const appointmentTime = new Date(appointment.appointmentDate);
		const timeDifferenceHours =
			(appointmentTime.getTime() - now.getTime()) / (1000 * 60 * 60);

		if (timeDifferenceHours < 2 && timeDifferenceHours > 0) {
			throw new AppointmentNotCancelableTimeError();
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
