import { AppError } from "./app-error";

export class AppointmentNotReschedulablePermissionError extends AppError {
	constructor() {
		super(
			"Você não tem permissão para reagendar este agendamento",
			"APPOINTMENT_NOT_RESCHEDULABLE_PERMISSION",
			403,
		);
	}
}
