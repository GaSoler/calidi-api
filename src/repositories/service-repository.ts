import type { Prisma } from "@prisma/client";
import type { Service } from "@/types/repository";

export interface ServiceRepository {
	findById(id: string): Promise<Service | null>;
	findByName(name: string): Promise<Service | null>;
	findAll(filters?: Prisma.ServiceWhereInput): Promise<Service[]>;
	create(data: {
		name: string;
		description?: string;
		duration: number;
		price: number;
	}): Promise<Service>;
	update(
		id: string,
		data: Partial<{
			name: string;
			description?: string;
			active?: boolean;
			duration: number;
			price: number;
		}>,
	): Promise<Service>;
	delete(id: string): Promise<void>;
}
