import { AppError } from "./app-error";

export class UnableToUpdateUserDataError extends AppError {
	constructor() {
		super(
			"Não foi possível alterar as informações do usuário.",
			"UNABLE_TO_UPDATE_USER_DATA",
			400,
		);
	}
}
