import { AppError } from "./app-error";

export class AppointmentNotCancelableTimeError extends AppError {
	constructor() {
		super(
			"Você pode cancelar um agendamento com menos de duas horas da realização do mesmo.",
			"APPOINTMENT_NOT_CANCELABLE_TIME",
			404,
		);
	}
}
