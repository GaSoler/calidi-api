import { AppError } from "./app-error";

export class UnableToSendOtpError extends AppError {
	constructor() {
		super(
			"Não foi possível enviar código de acesso.",
			"UNABLE_TO_SEND_OTP",
			503,
		);
	}
}
