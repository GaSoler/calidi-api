import type { Weekday } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { BarberAvailabilityRepository } from "../barber-availability-repository";

export class PrismaBarberAvailabilityRepository
	implements BarberAvailabilityRepository
{
	async findByBarberIdAndWeekday(
		barberId: string,
		weekday: Weekday,
	): Promise<{ startTime: string; endTime: string } | null> {
		const availability = await prisma.barberAvailability.findUnique({
			where: {
				barberId_weekday: {
					barberId,
					weekday,
				},
			},
		});

		if (!availability) {
			return null;
		}

		return {
			startTime:
				`${availability.startTime.getUTCHours().toString().padStart(2, "0")}:` +
				`${availability.startTime.getUTCMinutes().toString().padStart(2, "0")}:`,
			endTime:
				`${availability.endTime.getUTCHours().toString().padStart(2, "0")}:` +
				`${availability.endTime.getUTCMinutes().toString().padStart(2, "0")}:`,
		};
	}
}
