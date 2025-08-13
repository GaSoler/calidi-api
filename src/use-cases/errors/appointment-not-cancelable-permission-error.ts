import { AppError } from "./app-error";

export class AppointmentNotCancelablePermissionError extends AppError {
	constructor() {
		super(
			"Você não tem permissão para cancelar este agendamento",
			"APPOINTMENT_NOT_CANCELABLE_PERMISSION",
			403,
		);
	}
}
