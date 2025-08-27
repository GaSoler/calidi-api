import type { AppointmentRepository } from "@/repositories/appointment-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { AppointmentWithRelations } from "@/types/api";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface ListCustomerAppointmentsUseCaseRequest {
	customerId: string;
}

interface ListCustomerAppointmentsUseCaseResponse {
	appointments: AppointmentWithRelations[];
}

export class ListCustomerAppointmentsUseCase {
	constructor(
		private userRepository: UserRepository,
		private appointmentRepository: AppointmentRepository,
	) {}

	async execute({
		customerId,
	}: ListCustomerAppointmentsUseCaseRequest): Promise<ListCustomerAppointmentsUseCaseResponse> {
		const customer = await this.userRepository.findById(customerId);
		if (!customer) {
			throw new UserNotFoundError();
		}

		const appointments = (
			await this.appointmentRepository.findManyByCustomerId(customer.id)
		).map((appointment) => ({
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
		}));

		return {
			appointments,
		};
	}
}
