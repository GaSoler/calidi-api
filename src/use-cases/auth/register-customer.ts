import type { RoleRepository } from "@/repositories/role-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { User } from "@/types/api";
import { NotFoundRoleError } from "../errors/role-not-found-error";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface RegisterCustomerUseCaseRequest {
	phone: string;
	name: string;
	email: string;
}

interface RegisterCustomerUseCaseResponse {
	user: User;
}

export class RegisterCustomerUseCase {
	constructor(
		private userRepository: UserRepository,
		private roleRepository: RoleRepository,
	) {}

	async execute({
		phone,
		name,
		email,
	}: RegisterCustomerUseCaseRequest): Promise<RegisterCustomerUseCaseResponse> {
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

		const roleNames = user.roles.map((role) => role.role.name);

		return {
			user: {
				name: user.name,
				email: user.email,
				phone: user.phone,
				roles: roleNames,
			},
		};
	}
}
