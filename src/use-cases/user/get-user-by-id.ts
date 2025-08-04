import type { RoleRepository } from "@/repositories/role-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { User } from "@/types/user";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface GetUserByIdUseCaseRequest {
	userId: string;
}

interface GetUserByIdUseCaseResponse {
	user: User;
}

export class GetUserByIdUseCase {
	constructor(
		private userRepository: UserRepository,
		private roleRepository: RoleRepository,
	) {}

	async execute({
		userId,
	}: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new UserNotFoundError();
		}

		const roles = await this.roleRepository.findByUserId(user.id);

		return {
			user: {
				name: user.name,
				email: user.email,
				phone: user.phone,
				roles: roles.map((role) => role.name),
			},
		};
	}
}
