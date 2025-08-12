import type { Service } from "@prisma/client";

export interface ServiceRepository {
	findAllActive(): Promise<Service[]>;
	// findAll(): Promise<Service[]>;
	findById(id: string): Promise<Service | null>;
	// findByName(name: string): Promise<Service | null>;
	// create(data: {
	// 	name: string;
	// 	duration: number;
	// 	price: number;
	// }): Promise<Service>;
	// update(
	// 	id: string,
	// 	data: Partial<{
	// 		name: string;
	// 		duration: number;
	// 		price: number;
	// 	}>,
	// ): Promise<Service>;
	// delete(id: string): Promise<void>;
}
