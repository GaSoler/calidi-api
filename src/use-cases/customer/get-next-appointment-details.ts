import type { AppointmentRepository } from "@/repositories/appointment-repository";
import type { ServiceRepository } from "@/repositories/service-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { Appointment } from "@/types";
import { NotFoundServiceError } from "../errors/not-found-service-error";
import { ServiceInactiveError } from "../errors/service-inactive-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface GetAppointmentDetailsUseCaseRequest {
	customerId: string;
}

interface GetAppointmentDetailsUseCaseResponse {
	appointment: Appointment | null;
}

export class GetAppointmentDetailsUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private userRepository: UserRepository,
		private serviceRepository: ServiceRepository,
	) {}

	async execute({
		customerId,
	}: GetAppointmentDetailsUseCaseRequest): Promise<GetAppointmentDetailsUseCaseResponse> {
		const customer = await this.userRepository.findById(customerId);
		if (!customer) {
			throw new UserNotFoundError();
		}

		const nextAppointment =
			await this.appointmentRepository.findNextByCustomerId(customer.id);
		if (!nextAppointment) {
			return {
				appointment: null,
			};
		}

		const service = await this.serviceRepository.findById(
			nextAppointment.serviceId,
		);
		if (!service) {
			throw new NotFoundServiceError();
		}
		if (!service.active) {
			throw new ServiceInactiveError();
		}

		const barber = await this.userRepository.findById(nextAppointment.barberId);
		if (!barber) {
			throw new UserNotFoundError();
		}

		return {
			appointment: {
				id: nextAppointment.id,
				customerId: customer.id,
				customerName: customer.name,
				barberId: barber.id,
				barberName: barber.name,
				serviceId: service.id,
				serviceName: service.name,
				serviceDescription: service.description,
				serviceDuration: service.duration,
				servicePrice: service.price,
				status: nextAppointment.status,
				appointmentDateTime: nextAppointment.appointmentDate.toISOString(),
				canceledReason: nextAppointment.canceledReason,
			},
		};
	}
}
