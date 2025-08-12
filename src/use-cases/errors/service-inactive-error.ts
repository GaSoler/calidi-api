import { AppError } from "./app-error";

export class ServiceInactiveError extends AppError {
	constructor() {
		super("Serviço está inativo", "SERVICE_INACTIVE", 400);
	}
}
