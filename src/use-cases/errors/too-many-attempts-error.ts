import { AppError } from "./app-error";

export class TooManyAttemptsError extends AppError {
	constructor() {
		super(
			"Muitas tentativas de OTP inválidas. Tente novamente mais tarde.",
			"TOO_MANY_ATTEMPTS",
			429,
		);
	}
}
