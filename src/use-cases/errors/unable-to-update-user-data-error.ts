export class UnableToUpdateUserDataError extends Error {
	constructor() {
		super("Não foi possível alterar as informações do usuário.");
	}
}
