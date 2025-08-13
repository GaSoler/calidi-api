import { AppError } from "./app-error";

export class NotFoundAppointmentError extends AppError {
	constructor() {
		super(
			"Não foi possível encontrar esse agendamento.",
			"NOT_FOUND_APPOINTMENT",
			404,
		);
	}
}
