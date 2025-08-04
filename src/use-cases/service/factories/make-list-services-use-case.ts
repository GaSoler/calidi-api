import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { ListServicesUseCase } from "@/use-cases/service/list-services";

export function makeListServicesUseCase() {
	const serviceRepository = new PrismaServiceRepository();

	const listServicesUseCase = new ListServicesUseCase(serviceRepository);

	return listServicesUseCase;
}
