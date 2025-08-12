import { AppError } from "./app-error";

export class BarberUnavailableError extends AppError {
	constructor() {
		super("Barbeiro indisponível neste dia", "BARBER_UNAVAILABLE", 400);
	}
}
