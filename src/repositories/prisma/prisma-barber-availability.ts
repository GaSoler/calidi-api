import type { Weekday } from "@prisma/client";
import { format } from "date-fns";
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
			startTime: format(availability.startTime, "HH:mm"),
			endTime: format(availability.endTime, "HH:mm"),
		};
	}
}
