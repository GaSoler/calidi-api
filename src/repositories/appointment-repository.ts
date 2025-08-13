import type { Appointment, CancelReason } from "@prisma/client";

export interface AppointmentRepository {
	findManyByCustomerId(customerId: string): Promise<Appointment[]>;
	findById(appointmentId: string): Promise<Appointment | null>;
	findNextByCustomerId(customerId: string): Promise<Appointment | null>;
	create(data: {
		customerId: string;
		barberId: string;
		serviceId: string;
		appointmentDate: Date;
	}): Promise<Appointment>;
	// reschedule(
	// 	customerId: string,
	// 	data: {
	// 		appointmentId: string;
	// 		appointmentDate: Date;
	// 		startsAt: string;
	// 	},
	// ): Promise<Appointment | null>;
	cancel(
		appointmentId: string,
		reason: CancelReason,
	): Promise<Appointment | null>;
	findByBarberAndDate(
		barberId: string,
		date: Date,
	): Promise<
		Array<{
			appointmentDate: Date;
			duration: number;
		}>
	>;
}
