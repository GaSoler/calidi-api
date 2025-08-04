import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { UpdateServiceUseCase } from "@/use-cases/service/update-service";

export function makeUpdateServiceUseCase() {
	const serviceRepository = new PrismaServiceRepository();

	const updateServiceUseCase = new UpdateServiceUseCase(serviceRepository);

	return updateServiceUseCase;
}
