export class UserAlreadyExistsError extends Error {
	constructor() {
		super("Já existe um usuário com esse número de telefone.");
	}
}
