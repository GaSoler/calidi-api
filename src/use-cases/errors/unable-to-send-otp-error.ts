export class UnableToSendOtpError extends Error {
	constructor() {
		super("Não foi possível enviar código de acesso.");
	}
}
