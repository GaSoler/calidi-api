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
	active: boolean;
	duration: number;
	price: number;
};

export type AppointmentWithRelations = {
	id: string;
	status: string;
	appointmentDateTime: Date;
	canceledReason: string | null;
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
		description: string | null;
		duration: number;
		price: number;
		active: boolean;
	};
};
