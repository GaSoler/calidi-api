import { AppError } from "./app-error";

export class TimeConflictError extends AppError {
	constructor() {
		super("Horário conflita com outro agendamento", "TIME_CONFLICT", 400);
	}
}
