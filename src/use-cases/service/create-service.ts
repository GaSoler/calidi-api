import type { Service } from "@prisma/client";
import type { ServiceRepository } from "@/repositories/service-repository";
import { ServiceAlreadyExistsError } from "@/use-cases/errors/service-already-exists-error";

interface CreateServiceUseCaseRequest {
	name: string;
	duration: number;
	price: number;
}

interface CreateServiceUseCaseResponse {
	service: Service;
}

export class CreateServiceUseCase {
	constructor(private serviceRepository: ServiceRepository) {}

	async execute({
		name,
		duration,
		price,
	}: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
		const existingService = await this.serviceRepository.findByName(name);
		if (existingService) {
			throw new ServiceAlreadyExistsError();
		}

		const service = await this.serviceRepository.create({
			name,
			duration,
			price,
		});

		return { service };
	}
}
