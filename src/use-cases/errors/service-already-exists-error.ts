import { AppError } from "./app-error";

export class ServiceAlreadyExistsError extends AppError {
	constructor() {
		super("Já existe um serviço com esse nome.", "SERVICE_ALREADY_EXISTS", 409);
	}
}
