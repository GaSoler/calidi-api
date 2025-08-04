import type { RoleRepository } from "@/repositories/role-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { User } from "@/types/user";
import { NotFoundRoleError } from "../errors/role-not-found-error";

interface ListUsersUseCaseRequest {
	roleName?: string;
}

interface ListUsersUseCaseResponse {
	users: User[];
}

export class ListUsersUseCase {
	constructor(
		private userRepository: UserRepository,
		private roleRepository: RoleRepository,
	) {}

	async execute({
		roleName,
	}: ListUsersUseCaseRequest): Promise<ListUsersUseCaseResponse> {
		if (roleName) {
			const role = await this.roleRepository.findByName(roleName);

			if (!role) {
				throw new NotFoundRoleError();
			}

			const users = await this.userRepository.findByRole(role.name);

			const formattedUsers = await Promise.all(
				users.map(async (user) => {
					const roles = await this.roleRepository.findByUserId(user.id);
					return {
						name: user.name,
						email: user.email,
						phone: user.phone,
						roles: roles.map((role) => role.name),
					};
				}),
			);

			return {
				users: formattedUsers,
			};
		}

		const users = await this.userRepository.findAll();

		const formattedUsers = await Promise.all(
			users.map(async (user) => {
				const roles = await this.roleRepository.findByUserId(user.id);
				return {
					name: user.name,
					email: user.email,
					phone: user.phone,
					roles: roles.map((role) => role.name),
				};
			}),
		);

		return {
			users: formattedUsers,
		};
	}
}
