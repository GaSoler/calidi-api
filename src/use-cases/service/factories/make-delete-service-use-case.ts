import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { DeleteServiceUseCase } from "@/use-cases/service/delete-service";

export function makeDeleteServiceUseCase() {
	const serviceRepository = new PrismaServiceRepository();

	const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository);

	return deleteServiceUseCase;
}
