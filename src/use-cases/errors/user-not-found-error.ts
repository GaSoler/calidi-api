import { AppError } from "./app-error";

export class UserNotFoundError extends AppError {
	constructor() {
		super("Não foi possível encontrar esse usuário.", "USER_NOT_FOUND", 404);
	}
}
