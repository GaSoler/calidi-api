import { PrismaAppointmentRepository } from "@/repositories/prisma/prisma-appointment-repository";
import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetAppointmentDetailsUseCase } from "../get-appointment-details";

export function makeGetAppointmentDetailsUseCase() {
	const appointmentRepository = new PrismaAppointmentRepository();
	const userRepository = new PrismaUserRepository();
	const serviceRepository = new PrismaServiceRepository();

	const getAppointmentDetailsUseCase = new GetAppointmentDetailsUseCase(
		appointmentRepository,
		userRepository,
		serviceRepository,
	);

	return getAppointmentDetailsUseCase;
}
