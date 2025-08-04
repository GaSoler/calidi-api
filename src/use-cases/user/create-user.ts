import type { RoleRepository } from "@/repositories/role-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { User } from "@/types/user";
import { NotFoundRoleError } from "../errors/role-not-found-error";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface CreateUserUseCaseRequest {
	phone: string;
	name: string;
	email: string;
	roleName: string;
}

interface CreateUserUseCaseResponse {
	user: User;
}

export class CreateUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private roleRepository: RoleRepository,
	) {}

	async execute({
		name,
		email,
		phone,
		roleName,
	}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
		const existingUser = await this.userRepository.findByPhone(phone);
		if (existingUser) {
			throw new UserAlreadyExistsError();
		}

		const role = await this.roleRepository.findByName(roleName);
		if (!role) {
			throw new NotFoundRoleError();
		}

		const user = await this.userRepository.create({
			name,
			email,
			phone,
			roleId: role.id,
		});

		return {
			user: {
				name: user.name,
				email: user.email,
				phone: user.phone,
				roles: [role.name],
			},
		};
	}
}
