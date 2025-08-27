import { AppError } from "./app-error";

export class AppointmentAlreadyCanceledError extends AppError {
	constructor() {
		super(
			"O agendamento já está cancelado",
			"APPOINTMENT_ALREADY_CANCELED",
			404,
		);
	}
}
