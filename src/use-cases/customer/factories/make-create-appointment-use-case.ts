import { PrismaAppointmentRepository } from "@/repositories/prisma/prisma-appointment-repository";
import { PrismaBarberAvailabilityRepository } from "@/repositories/prisma/prisma-barber-availability";
import { PrismaRoleRepository } from "@/repositories/prisma/prisma-role-repository";
import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { CreateAppointmentUseCase } from "../create-appointment";

export function makeCreateAppointmentUseCase() {
	const userRepository = new PrismaUserRepository();
	const serviceRepository = new PrismaServiceRepository();
	const roleRepository = new PrismaRoleRepository();
	const barberAvailabilityRepository = new PrismaBarberAvailabilityRepository();
	const appointmentRepository = new PrismaAppointmentRepository();

	const createAppointmentUseCase = new CreateAppointmentUseCase(
		userRepository,
		serviceRepository,
		roleRepository,
		barberAvailabilityRepository,
		appointmentRepository,
	);

	return createAppointmentUseCase;
}
