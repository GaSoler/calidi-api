export class UnableToLogoutError extends Error {
	constructor() {
		super("Não foi possível deslogar.");
	}
}
