import type {
	UserRepository,
	UserWithRoles,
} from "@/repositories/user-repository";
import { NotFoundUserError } from "./errors/not-found-user-error";
import { UnableToUpdateUserDataError } from "./errors/unable-to-update-user-data-error";

interface UpdateUserProfileUseCaseRequest {
	phone: string;
	name?: string;
	email?: string;
}

interface UpdateUserProfileUseCaseResponse {
	user: UserWithRoles;
}

export class UpdateUserProfileUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		phone,
		name,
		email,
	}: UpdateUserProfileUseCaseRequest): Promise<UpdateUserProfileUseCaseResponse> {
		const user = await this.userRepository.findByPhone(phone);

		if (!user) {
			throw new NotFoundUserError();
		}

		const dataToUpdate: Partial<{ name: string; email: string }> & {
			updatedAt: Date;
		} = {
			...(name != null && { name }),
			...(email != null && { email }),
			updatedAt: new Date(),
		};

		try {
			const updatedUser = await this.userRepository.update(
				user.id,
				dataToUpdate,
			);

			const userWithRoles = await this.userRepository.findByIdWithRoles(
				updatedUser.id,
			);

			if (!userWithRoles) {
				throw new UnableToUpdateUserDataError(); // ou outro erro, se preferir
			}

			return { user: userWithRoles };
		} catch (err) {
			throw new UnableToUpdateUserDataError();
		}
	}
}
