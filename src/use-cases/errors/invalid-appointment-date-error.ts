import { AppError } from "./app-error";

export class InvalidAppointmentDateError extends AppError {
	constructor() {
		super("O horário deve ser no futuro", "INVALID_APPOINTMENT_DATE", 400);
	}
}
