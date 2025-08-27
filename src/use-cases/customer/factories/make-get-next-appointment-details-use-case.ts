import { PrismaAppointmentRepository } from "@/repositories/prisma/prisma-appointment-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetNextAppointmentDetailsUseCase } from "../get-next-appointment-details";

export function makeGetNextAppointmentDetailsUseCase() {
	const userRepository = new PrismaUserRepository();
	const appointmentRepository = new PrismaAppointmentRepository();

	const getNextAppointmentDetailsUseCase = new GetNextAppointmentDetailsUseCase(
		userRepository,
		appointmentRepository,
	);

	return getNextAppointmentDetailsUseCase;
}
