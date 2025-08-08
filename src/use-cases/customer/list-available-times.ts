import { Weekday } from "@prisma/client";
import { addMinutes, format, isBefore, parseISO } from "date-fns";
import type { AppointmentRepository } from "@/repositories/appointment-repository";
import type { BarberAvailabilityRepository } from "@/repositories/barber-availability-repository";

interface ListAvailableTimesUseCaseRequest {
	barberId: string;
	date: Date;
}

interface TimeSlot {
	time: string;
	available: boolean;
}

interface ListAvailableTimesUseCaseResponse {
	timeSlots: TimeSlot[];
}

export class ListAvailableTimesUseCase {
	constructor(
		private barberAvailabilityRepository: BarberAvailabilityRepository,
		private appointmentRepository: AppointmentRepository,
	) {}

	async execute({
		barberId,
		date,
	}: ListAvailableTimesUseCaseRequest): Promise<ListAvailableTimesUseCaseResponse> {
		const weekday = [
			Weekday.SUNDAY,
			Weekday.MONDAY,
			Weekday.WEDNESDAY,
			Weekday.THURSDAY,
			Weekday.FRIDAY,
			Weekday.SATURDAY,
		][date.getDay()];

		const availability =
			await this.barberAvailabilityRepository.findByBarberIdAndWeekday(
				barberId,
				weekday as unknown as Weekday,
			);

		if (!availability) {
			return {
				timeSlots: [],
			};
		}

		const { startTime, endTime } = availability;

		const baseDate = format(date, "yyyy-MM-dd");
		const start = parseISO(`${baseDate}T${startTime}`);
		const end = parseISO(`${baseDate}T${endTime}`);

		const appointments = await this.appointmentRepository.findByBarberAndDate(
			barberId,
			date,
		);

		const timeSlots: TimeSlot[] = [];

		let current = start;

		while (isBefore(current, end)) {
			const time = format(current, "HH:mm");

			const isOccupied = appointments.some((appt) => {
				const apptStart = appt.appointmentDate;
				const apptEnd = addMinutes(apptStart, appt.duration);

				return (
					current.getTime() >= apptStart.getTime() &&
					current.getTime() < apptEnd.getTime()
				);
			});

			timeSlots.push({
				time,
				available: !isOccupied,
			});

			current = addMinutes(current, 30);
		}

		return { timeSlots };
	}
}
