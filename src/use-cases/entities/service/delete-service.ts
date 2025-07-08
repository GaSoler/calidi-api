import type { ServiceRepository } from "@/repositories/service-repository";
import { NotFoundServiceError } from "@/use-cases/errors/not-found-service-error";

interface DeleteServiceUseCaseRequest {
	serviceId: string;
}

export class DeleteServiceUseCase {
	constructor(private serviceRepository: ServiceRepository) {}

	async execute({ serviceId }: DeleteServiceUseCaseRequest): Promise<void> {
		const service = await this.serviceRepository.findById(serviceId);

		if (!service) {
			throw new NotFoundServiceError();
		}

		await this.serviceRepository.delete(service.id);
	}
}
