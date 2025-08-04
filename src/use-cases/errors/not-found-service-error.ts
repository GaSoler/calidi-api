import { AppError } from "./app-error";

export class NotFoundServiceError extends AppError {
	constructor() {
		super("Não foi possível encontrar esse serviço.", "NOT_FOUND_SERVICE", 404);
	}
}
