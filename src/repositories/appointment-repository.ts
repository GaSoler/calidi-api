export interface AppointmentRepository {
	// findManyByCustomerId(customerId: string): Promise<Appointment[]>;
	// findById(appointmentId: string): Promise<Appointment | null>;
	// create(data: {
	// 	customerId: string;
	// 	barberId: string;
	// 	serviceId: string;
	// 	appointmentDate: Date;
	// }): Promise<Appointment>;
	// reschedule(
	// 	customerId: string,
	// 	data: {
	// 		appointmentId: string;
	// 		appointmentDate: Date;
	// 		startsAt: string;
	// 	},
	// ): Promise<Appointment | null>;
	// cancel(
	// 	customerId: string,
	// 	appointmentId: string,
	// ): Promise<Appointment | null>;
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
