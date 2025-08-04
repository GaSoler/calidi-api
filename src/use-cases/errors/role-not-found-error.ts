import { AppError } from "./app-error";

export class NotFoundRoleError extends AppError {
	constructor() {
		super("Não foi possível encontrar esse papel.", "NOT_FOUND_ROLE", 404);
	}
}
