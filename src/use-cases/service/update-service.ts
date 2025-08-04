import type { Service } from "@prisma/client";
import type { ServiceRepository } from "@/repositories/service-repository";
import { NotFoundServiceError } from "@/use-cases/errors/not-found-service-error";

interface UpdateServiceUseCaseRequest {
	serviceId: string;
	data: {
		name?: string;
		duration?: number;
		price?: number;
	};
}

interface UpdateServiceUseCaseResponse {
	service: Service;
}

export class UpdateServiceUseCase {
	constructor(private serviceRepository: ServiceRepository) {}

	async execute({
		serviceId,
		data,
	}: UpdateServiceUseCaseRequest): Promise<UpdateServiceUseCaseResponse> {
		const service = await this.serviceRepository.findById(serviceId);

		if (!service) {
			throw new NotFoundServiceError();
		}

		const updatedService = await this.serviceRepository.update(
			service.id,
			data,
		);

		return { service: updatedService };
	}
}
