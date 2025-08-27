import type { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{
	select: {
		id: true;
		name: true;
		email: true;
		phone: true;
	};
}>;

export type UserWithRoles = Prisma.UserGetPayload<{
	include: {
		roles: {
			include: {
				role: true;
			};
		};
	};
}>;

export type Role = Prisma.RoleGetPayload<{
	select: {
		id: true;
		name: true;
	};
}>;

export type Service = Prisma.ServiceGetPayload<{
	select: {
		id: true;
		name: true;
		description: true;
		active: true;
		duration: true;
		price: true;
	};
}>;

export type Otp = Prisma.OtpGetPayload<{
	select: {
		id: true;
		userId: true;
		code: true;
		expiresAt: true;
		used: true;
		createdAt: true;
	};
}>;

export type Appointment = Prisma.AppointmentGetPayload<{
	select: {
		id: true;
		customerId: true;
		barberId: true;
		serviceId: true;
		status: true;
		appointmentDate: true;
		canceledReason: true;
		createdAt: true;
		updatedAt: true;
	};
}>;

export type AppointmentWithRelations = Prisma.AppointmentGetPayload<{
	include: {
		barber: true;
		customer: true;
		service: true;
	};
}>;
