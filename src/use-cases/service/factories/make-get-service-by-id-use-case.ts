import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { GetServiceByIdUseCase } from "@/use-cases/service/get-service-by-id";

export function makeGetServiceByIdUseCase() {
	const serviceRepository = new PrismaServiceRepository();

	const getServiceByIdUseCase = new GetServiceByIdUseCase(serviceRepository);

	return getServiceByIdUseCase;
}
