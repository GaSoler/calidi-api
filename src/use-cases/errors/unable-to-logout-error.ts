import { AppError } from "./app-error";

export class UnableToLogoutError extends AppError {
	constructor() {
		super("Não foi possível deslogar.", "UNABLE_TO_LOGOUT", 500);
	}
}
