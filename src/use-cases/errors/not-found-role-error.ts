export class NotFoundRoleError extends Error {
	constructor() {
		super("Não foi possível encontrar esse papel.");
	}
}
