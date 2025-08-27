import type { Appointment, CancelReason } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { AppointmentWithRelations } from "@/types/repository";
import type { AppointmentRepository } from "../appointment-repository";

export class PrismaAppointmentRepository implements AppointmentRepository {
	async findById(
		appointmentId: string,
	): Promise<AppointmentWithRelations | null> {
		const appointment = await prisma.appointment.findUnique({
			where: { id: appointmentId },
			include: {
				barber: true,
				customer: true,
				service: true,
			},
		});

		return appointment;
	}

	async findManyByCustomerId(
		customerId: string,
	): Promise<AppointmentWithRelations[]> {
		const appointments = await prisma.appointment.findMany({
			where: { customerId },
			include: {
				barber: true,
				customer: true,
				service: true,
			},
		});

		return appointments;
	}

	async findNextByCustomerId(
		customerId: string,
	): Promise<AppointmentWithRelations | null> {
		const nextAppointment = await prisma.appointment.findFirst({
			where: {
				customerId,
				status: "CONFIRMED",
				appointmentDate: {
					gte: new Date(),
				},
			},
			include: {
				barber: true,
				customer: true,
				service: true,
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
	}): Promise<AppointmentWithRelations> {
		const { appointmentDate, barberId, customerId, serviceId } = data;
		const appointment = await prisma.appointment.create({
			data: {
				customerId,
				barberId,
				serviceId,
				appointmentDate,
				status: "CONFIRMED",
			},
			include: {
				barber: true,
				customer: true,
				service: true,
			},
		});

		return appointment;
	}

	// async cancel(
	// 	appointmentId: string,
	// 	data: {
	// 		status: string;
	// 		canceledReason: string;
	// 		canceledAt: Date;
	// 		canceledBy: string;
	// 	},
	// ): Promise<Appointment> {}

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
