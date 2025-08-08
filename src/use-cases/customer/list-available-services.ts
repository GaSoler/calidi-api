import type { ServiceRepository } from "@/repositories/service-repository";
import type { Service } from "@/types/service";

interface ListAvailableServicesUseCaseResponse {
	services: Service[];
}

export class ListAvailableServicesUseCase {
	constructor(private serviceRepository: ServiceRepository) {}

	async execute(): Promise<ListAvailableServicesUseCaseResponse> {
		const services = (await this.serviceRepository.findAllActive()).map(
			(service) => ({
				id: service.id,
				name: service.name,
				description: service.description,
				price: service.price,
				duration: service.duration,
			}),
		);

		return { services };
	}
}
