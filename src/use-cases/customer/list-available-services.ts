import type { ServiceRepository } from "@/repositories/service-repository";
import type { Service } from "@/types/api";

interface ListAvailableServicesUseCaseResponse {
	services: Service[];
}

export class ListAvailableServicesUseCase {
	constructor(private serviceRepository: ServiceRepository) {}

	async execute(): Promise<ListAvailableServicesUseCaseResponse> {
		const services = (
			await this.serviceRepository.findAll({ active: true })
		).map((service) => ({
			id: service.id,
			name: service.name,
			description: service.description,
			active: service.active,
			price: service.price,
			duration: service.duration,
		}));

		return { services };
	}
}
