import type { Service } from "@prisma/client";
import type { ServiceRepository } from "@/repositories/service-repository";

interface ListAvailableServicesUseCaseResponse {
	services: Service[];
}

export class ListAvailableServicesUseCase {
	constructor(private serviceRepository: ServiceRepository) {}

	async execute(): Promise<ListAvailableServicesUseCaseResponse> {
		const services = await this.serviceRepository.findAllActive();

		return { services };
	}
}
