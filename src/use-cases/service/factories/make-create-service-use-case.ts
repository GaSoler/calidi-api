import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { CreateServiceUseCase } from "@/use-cases/service/create-service";

export function makeCreateServiceUseCase() {
	const serviceRepository = new PrismaServiceRepository();

	const createServiceUseCase = new CreateServiceUseCase(serviceRepository);

	return createServiceUseCase;
}
