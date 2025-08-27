import type { AppointmentRepository } from "@/repositories/appointment-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { AppointmentWithRelations } from "@/types/api";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface GetNextAppointmentDetailsUseCaseRequest {
	customerId: string;
}

interface GetNextAppointmentDetailsUseCaseResponse {
	appointment: AppointmentWithRelations | null;
}

export class GetNextAppointmentDetailsUseCase {
	constructor(
		private userRepository: UserRepository,
		private appointmentRepository: AppointmentRepository,
	) {}

	async execute({
		customerId,
	}: GetNextAppointmentDetailsUseCaseRequest): Promise<GetNextAppointmentDetailsUseCaseResponse> {
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

		return {
			appointment: {
				id: nextAppointment.id,
				status: nextAppointment.status,
				appointmentDateTime: nextAppointment.appointmentDate,
				canceledReason: nextAppointment.canceledReason,
				customer: {
					id: nextAppointment.customer.id,
					name: nextAppointment.customer.name,
					email: nextAppointment.customer.email,
					phone: nextAppointment.customer.phone,
				},
				barber: {
					id: nextAppointment.barber.id,
					name: nextAppointment.barber.name,
					email: nextAppointment.barber.email,
					phone: nextAppointment.barber.phone,
				},
				service: {
					id: nextAppointment.service.id,
					name: nextAppointment.service.name,
					description: nextAppointment.service.description,
					duration: nextAppointment.service.duration,
					price: nextAppointment.service.price,
					active: nextAppointment.service.active,
				},
			},
		};
	}
}
