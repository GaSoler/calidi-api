import type { BarberAvailability, Weekday } from "@prisma/client";

export interface BarberAvailabilityRepository {
	findAll(): Promise<BarberAvailability[]>;
	findByWeekday(weekday: Weekday): Promise<BarberAvailability[]>;
	findByBarberId(barberId: string): Promise<BarberAvailability[]>;
	create(barberId: string);
	delete();
}
