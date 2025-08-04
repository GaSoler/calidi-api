import type { RoleRepository } from "@/repositories/role-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { User } from "@/types/user";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface UpdateUserUseCaseRequest {
	userId: string;
	data: {
		name: string;
		email: string;
	};
}

interface UpdateUserUseCaseResponse {
	user: User;
}

export class UpdateUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private roleRepository: RoleRepository,
	) {}

	async execute({
		userId,
		data,
	}: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new UserNotFoundError();
		}

		const roles = await this.roleRepository.findByUserId(user.id);

		const updatedUser = await this.userRepository.update(user.id, data);

		return {
			user: {
				name: updatedUser.name,
				email: updatedUser.email,
				phone: updatedUser.phone,
				roles: roles.map((role) => role.name),
			},
		};
	}
}
