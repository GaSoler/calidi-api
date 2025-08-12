import type { Appointment } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { AppointmentRepository } from "../appointment-repository";

export class PrismaAppointmentRepository implements AppointmentRepository {
	// async findManyByCustomerId(customerId: string): Promise<Appointment[]> {
	// 	const appointments = await prisma.appointment.findMany({
	// 		where: { customerId },
	// 		include: {
	// 			service: true,
	// 			barber: true,
	// 		},
	// 	});

	// 	return appointments;
	// }

	// async findById(appointmentId: string): Promise<Appointment | null> {
	// 	const appointment = await prisma.appointment.findUnique({
	// 		where: { id: appointmentId },
	// 	});

	// 	return appointment;
	// }

	async create(data: {
		customerId: string;
		barberId: string;
		serviceId: string;
		appointmentDate: Date;
	}): Promise<Appointment> {
		const { appointmentDate, barberId, customerId, serviceId } = data;
		const appointment = await prisma.appointment.create({
			data: {
				customerId,
				barberId,
				serviceId,
				appointmentDate,
				status: "CONFIRMED",
			},
		});

		return appointment;
	}

	async findByBarberAndDate(
		barberId: string,
		date: Date,
	): Promise<Array<{ appointmentDate: Date; duration: number }>> {
		const startOfDay = new Date(date);
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date(date);
		endOfDay.setHours(23, 59, 59, 999);

		const appointments = await prisma.appointment.findMany({
			where: {
				barberId,
				appointmentDate: {
					gte: startOfDay,
					lte: endOfDay,
				},
				status: "CONFIRMED",
			},
			select: {
				appointmentDate: true,
				service: {
					select: {
						duration: true,
					},
				},
			},
		});

		return appointments.map((appointment) => ({
			appointmentDate: appointment.appointmentDate,
			duration: appointment.service.duration,
		}));
	}
}
