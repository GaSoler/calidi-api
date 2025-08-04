import { AppError } from "./app-error";

export class UserAlreadyExistsError extends AppError {
	constructor() {
		super(
			"Já existe um usuário com esse número de telefone.",
			"USER_ALREADY_EXISTS",
			409,
		);
	}
}
