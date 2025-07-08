import type { Service } from "@prisma/client";
import type { ServiceRepository } from "@/repositories/service-repository";

interface ListServicesUseCaseResponse {
	services: Service[];
}

export class ListServicesUseCase {
	constructor(private serviceRepository: ServiceRepository) {}

	async execute(): Promise<ListServicesUseCaseResponse> {
		const services = await this.serviceRepository.findAll();

		return { services };
	}
}
