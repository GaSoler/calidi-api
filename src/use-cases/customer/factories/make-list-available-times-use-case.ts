import { PrismaAppointmentRepository } from "@/repositories/prisma/prisma-appointment-repository";
import { PrismaBarberAvailabilityRepository } from "@/repositories/prisma/prisma-barber-availability";
import { ListAvailableTimesUseCase } from "../list-available-times";

export function makeListAvailableTimesUseCase() {
	const barberAvailabilityRepository = new PrismaBarberAvailabilityRepository();
	const appointmentRepository = new PrismaAppointmentRepository();

	const listAvailableTimesUseCase = new ListAvailableTimesUseCase(
		barberAvailabilityRepository,
		appointmentRepository,
	);

	return listAvailableTimesUseCase;
}
