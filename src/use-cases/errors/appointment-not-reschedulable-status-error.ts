import { AppError } from "./app-error";

export class AppointmentNotReschedulableStatusError extends AppError {
	constructor() {
		super(
			"Agendamento não pode ser reagendado no status atual",
			"APPOINTMENT_NOT_RESCHEDULABLE_STATUS",
			400,
		);
	}
}
