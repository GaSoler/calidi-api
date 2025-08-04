import type { UserRepository } from "@/repositories/user-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface DeleteUserUseCaseRequest {
	userId: string;
}

export class DeleteUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ userId }: DeleteUserUseCaseRequest) {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new UserNotFoundError();
		}

		await this.userRepository.delete(user.id);
	}
}
