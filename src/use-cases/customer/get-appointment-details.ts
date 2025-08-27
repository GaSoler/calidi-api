import type { AppointmentRepository } from "@/repositories/appointment-repository";
import type { ServiceRepository } from "@/repositories/service-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { AppointmentWithRelations } from "@/types/api";
import { NotFoundAppointmentError } from "../errors/not-found-appointment-error";
import { NotFoundServiceError } from "../errors/not-found-service-error";
import { ServiceInactiveError } from "../errors/service-inactive-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface GetAppointmentDetailsUseCaseRequest {
	appointmentId: string;
}

interface GetAppointmentDetailsUseCaseResponse {
	appointment: AppointmentWithRelations | null;
}

export class GetAppointmentDetailsUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private userRepository: UserRepository,
		private serviceRepository: ServiceRepository,
	) {}

	async execute({
		appointmentId,
	}: GetAppointmentDetailsUseCaseRequest): Promise<GetAppointmentDetailsUseCaseResponse> {
		const appointment =
			await this.appointmentRepository.findById(appointmentId);

		if (!appointment) {
			throw new NotFoundAppointmentError();
		}

		const customer = await this.userRepository.findById(appointment.customerId);
		if (!customer) {
			throw new UserNotFoundError();
		}

		const service = await this.serviceRepository.findById(
			appointment.serviceId,
		);
		if (!service) {
			throw new NotFoundServiceError();
		}
		if (!service.active) {
			throw new ServiceInactiveError();
		}

		const barber = await this.userRepository.findById(appointment.barberId);
		if (!barber) {
			throw new UserNotFoundError();
		}

		return {
			appointment: {
				id: appointment.id,
				status: appointment.status,
				appointmentDateTime: appointment.appointmentDate,
				canceledReason: appointment.canceledReason,
				customer: {
					id: appointment.customer.id,
					name: appointment.customer.name,
					email: appointment.customer.email,
					phone: appointment.customer.phone,
				},
				barber: {
					id: appointment.barber.id,
					name: appointment.barber.name,
					email: appointment.barber.email,
					phone: appointment.barber.phone,
				},
				service: {
					id: appointment.service.id,
					name: appointment.service.name,
					description: appointment.service.description,
					duration: appointment.service.duration,
					price: appointment.service.price,
					active: appointment.service.active,
				},
			},
		};
	}
}
