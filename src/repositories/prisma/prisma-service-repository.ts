import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Service } from "@/types/repository";
import type { ServiceRepository } from "../service-repository";

export class PrismaServiceRepository implements ServiceRepository {
	async findById(id: string): Promise<Service | null> {
		const service = await prisma.service.findUnique({
			where: {
				id,
			},
		});

		return service;
	}

	async findByName(name: string): Promise<Service | null> {
		const service = await prisma.service.findUnique({
			where: {
				name,
			},
		});

		return service;
	}

	async findAll(filters?: Prisma.ServiceWhereInput): Promise<Service[]> {
		const services = await prisma.service.findMany({
			where: filters,
			orderBy: { name: "asc" },
		});

		return services;
	}

	async create(data: {
		name: string;
		description?: string;
		duration: number;
		price: number;
	}): Promise<Service> {
		const service = await prisma.service.create({
			data: {
				name: data.name,
				description: data.description,
				duration: data.duration,
				price: data.price,
			},
		});

		return service;
	}

	async update(
		id: string,
		data: Partial<{
			name: string;
			description?: string;
			active?: boolean;
			duration: number;
			price: number;
		}>,
	): Promise<Service> {
		const updatedService = await prisma.service.update({
			where: { id },
			data,
		});

		return updatedService;
	}

	async delete(id: string): Promise<void> {
		await prisma.service.delete({
			where: { id },
		});
	}
}
