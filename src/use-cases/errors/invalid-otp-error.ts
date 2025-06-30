export class InvalidOtpError extends Error {
	constructor() {
		super("OTP inválido ou expirado.");
	}
}
