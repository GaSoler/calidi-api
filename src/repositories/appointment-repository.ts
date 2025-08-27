import type { Appointment, CancelReason } from "@prisma/client";
import type { AppointmentWithRelations } from "@/types/repository";

export interface AppointmentRepository {
	findById(appointmentId: string): Promise<AppointmentWithRelations | null>;
	findManyByCustomerId(customerId: string): Promise<AppointmentWithRelations[]>;
	findNextByCustomerId(
		customerId: string,
	): Promise<AppointmentWithRelations | null>;
	create(data: {
		customerId: string;
		barberId: string;
		serviceId: string;
		appointmentDate: Date;
	}): Promise<AppointmentWithRelations>;
	// reschedule(
	// 	customerId: string,
	// 	data: {
	// 		appointmentId: string;
	// 		appointmentDate: Date;
	// 		startsAt: string;
	// 	},
	// ): Promise<Appointment | null>;
	// cancel(
	// 	appointmentId: string,
	// 	data: {
	// 		status: string;
	// 		canceledReason: string;
	// 		canceledAt: Date;
	// 		canceledBy: string;
	// 	},
	// ): Promise<Appointment>;
	// findByIdWithRelations(
	// 	appointmentId: string,
	// ): Promise<AppointmentWithRelations | null>;
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
