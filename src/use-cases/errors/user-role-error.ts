import { AppError } from "./app-error";

export class UserRoleError extends AppError {
	constructor() {
		super(
			"Usuário não possui permissão para realizar esta ação.",
			"USER_ROLE_ERROR",
			403,
		);
	}
}
