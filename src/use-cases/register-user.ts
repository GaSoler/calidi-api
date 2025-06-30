import type { User } from "@prisma/client";
import type { RoleRepository } from "@/repositories/role-repository";
import type { UserRepository } from "@/repositories/user-repository";
import { NotFoundRoleError } from "./errors/not-found-role-error";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUserUseCaseRequest {
	phone: string;
	name?: string;
	email?: string;
}

interface RegisterUserUseCaseResponse {
	user: User;
}

export class RegisterUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private roleRepository: RoleRepository,
	) {}

	async execute({
		phone,
		name,
		email,
	}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
		const existingUser = await this.userRepository.findByPhone(phone);
		if (existingUser) {
			throw new UserAlreadyExistsError();
		}

		const role = await this.roleRepository.findByName("CUSTOMER");
		if (!role) {
			throw new NotFoundRoleError();
		}

		const user = await this.userRepository.create({
			name,
			phone,
			email,
			roleId: role.id,
		});

		return { user };
	}
}
