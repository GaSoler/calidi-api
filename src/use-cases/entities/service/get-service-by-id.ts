import type { Service } from "@prisma/client";
import type { ServiceRepository } from "@/repositories/service-repository";
import { NotFoundServiceError } from "@/use-cases/errors/not-found-service-error";

interface GetServiceByIdUseCaseRequest {
	serviceId: string;
}

interface GetServiceByIdUseCaseResponse {
	service: Service;
}

export class GetServiceByIdUseCase {
	constructor(private serviceRepository: ServiceRepository) {}

	async execute({
		serviceId,
	}: GetServiceByIdUseCaseRequest): Promise<GetServiceByIdUseCaseResponse> {
		const service = await this.serviceRepository.findById(serviceId);

		if (!service) {
			throw new NotFoundServiceError();
		}

		return { service };
	}
}
