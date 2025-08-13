import type { Appointment, CancelReason } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { AppointmentRepository } from "../appointment-repository";

export class PrismaAppointmentRepository implements AppointmentRepository {
	async findManyByCustomerId(customerId: string): Promise<Appointment[]> {
		const appointments = await prisma.appointment.findMany({
			where: { customerId },
			include: {
				service: true,
				barber: true,
			},
		});

		return appointments;
	}

	async findById(appointmentId: string): Promise<Appointment | null> {
		const appointment = await prisma.appointment.findUnique({
			where: { id: appointmentId },
		});

		return appointment;
	}

	async findNextByCustomerId(customerId: string): Promise<Appointment | null> {
		const nextAppointment = await prisma.appointment.findFirst({
			where: {
				customerId,
				status: "CONFIRMED",
				appointmentDate: {
					gte: new Date(),
				},
			},
			orderBy: {
				appointmentDate: "asc",
			},
		});

		return nextAppointment;
	}

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

	async cancel(
		appointmentId: string,
		reason: CancelReason,
	): Promise<Appointment | null> {
		const canceledAppointment = await prisma.appointment.update({
			where: { id: appointmentId },
			data: {
				status: "CANCELED",
				canceledReason: reason,
			},
		});

		return canceledAppointment;
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
