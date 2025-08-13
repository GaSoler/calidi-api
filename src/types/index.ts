export type User = {
	name: string;
	email: string;
	phone: string;
	roles: string[];
};

export type UserAccessToken = {
	id: string;
	roles: string[];
};

export type Barber = {
	id: string;
	name: string;
	email: string;
	phone: string;
};

export type Service = {
	id: string;
	name: string;
	description: string | null;
	duration: number;
	price: number;
};

export type Appointment = {
	id: string;
	customerId: string;
	customerName: string;
	barberId: string;
	barberName: string;
	serviceId: string;
	serviceName: string;
	serviceDescription: string | null;
	serviceDuration: number;
	servicePrice: number;
	status: string;
	appointmentDateTime: string;
	canceledReason: string | null;
};

export interface AppointmentWithRelations {
	id: string;
	customerId: string;
	barberId: string;
	serviceId: string;
	status: string;
	appointmentDate: Date;
	canceledReason: string | null;
	createdAt: Date;
	updatedAt: Date;
	rescheduledAt: Date | null;
	rescheduledBy: string | null;
	// Dados relacionados
	customer: {
		id: string;
		name: string;
		email: string;
		phone: string;
	};
	barber: {
		id: string;
		name: string;
		email: string;
		phone: string;
	};
	service: {
		id: string;
		name: string;
		description: string;
		duration: number;
		price: number;
		active: boolean;
	};
}
