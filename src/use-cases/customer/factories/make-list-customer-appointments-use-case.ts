import { PrismaAppointmentRepository } from "@/repositories/prisma/prisma-appointment-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { ListCustomerAppointmentsUseCase } from "../list-customer-appointments";

export function makeListCustomerAppointmentsUseCase() {
	const userRepository = new PrismaUserRepository();
	const appointmentRepository = new PrismaAppointmentRepository();

	const listCustomerAppointmentsUseCase = new ListCustomerAppointmentsUseCase(
		userRepository,
		appointmentRepository,
	);

	return listCustomerAppointmentsUseCase;
}
