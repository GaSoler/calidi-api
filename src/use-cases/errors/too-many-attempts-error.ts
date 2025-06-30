export class TooManyAttemptsError extends Error {
	constructor() {
		super("Muitas tentativas de OTP inválidas. Tente novamente mais tarde.");
	}
}
