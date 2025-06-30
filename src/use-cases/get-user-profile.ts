import type {
	UserRepository,
	UserWithRoles,
} from "@/repositories/user-repository";
import { NotFoundUserError } from "./errors/not-found-user-error";

interface GetUserProfileUseCaseRequest {
	userId: string;
}

interface GetUserProfileUseCaseResponse {
	user: UserWithRoles;
}

export class GetUserProfileUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		userId,
	}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.userRepository.findByIdWithRoles(userId);

		if (!user) {
			throw new NotFoundUserError();
		}

		return { user };
	}
}
