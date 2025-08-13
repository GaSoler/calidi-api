import { AppError } from "./app-error";

export class AppointmentNotCancelableStatusError extends AppError {
	constructor() {
		super(
			"Agendamento não pode ser cancelado no status atual",
			"APPOINTMENT_NOT_CANCELABLE_STATUS",
			400,
		);
	}
}
