export class NotFoundUserError extends Error {
	constructor() {
		super("Não foi possível encontrar esse usuário.");
	}
}
