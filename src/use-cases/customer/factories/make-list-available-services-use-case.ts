import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { ListAvailableServicesUseCase } from "../list-available-services";

export function makeListAvailableServicesUseCase() {
	const serviceRepository = new PrismaServiceRepository();

	const listAvailableServicesUseCase = new ListAvailableServicesUseCase(
		serviceRepository,
	);

	return listAvailableServicesUseCase;
}
