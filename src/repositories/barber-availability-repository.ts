import type { Weekday } from "@prisma/client";

export interface BarberAvailabilityRepository {
	findByBarberIdAndWeekday(
		barberId: string,
		weekday: Weekday,
	): Promise<{
		startTime: string;
		endTime: string;
	} | null>;
}
