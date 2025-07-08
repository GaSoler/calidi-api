export class NotFoundServiceError extends Error {
	constructor() {
		super("Não foi possível encontrar esse serviço.");
	}
}
