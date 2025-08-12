import { AppError } from "./app-error";

export class TimeNotAvailableError extends AppError {
	constructor() {
		super(
			"Horário fora da disponibilidade do barbeiro",
			"TIME_NOT_AVAILABLE",
			400,
		);
	}
}
