import type { Service } from "@prisma/client";
import type { ServiceRepository } from "../service-repository";
import { prisma } from "@/lib/prisma";

export class PrismaServiceRepository implements ServiceRepository {
	async findAll(): Promise<Service[]> {
		const services = await prisma.service.findMany();

		return services;
	}

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

	async create(data: {
		name: string;
		duration: number;
		price: number;
	}): Promise<Service> {
		const service = await prisma.service.create({
			data,
		});

		return service;
	}

	async update(
		id: string,
		data: Partial<{ name: string; duration: number; price: number }>,
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
