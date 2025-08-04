import { AppError } from "./app-error";

export class InvalidOtpError extends AppError {
	constructor() {
		super("OTP inválido ou expirado.", "INVALID_OTP", 401);
	}
}
