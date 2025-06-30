import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { UpdateUserProfileUseCase } from "../update-user-profile";

export function makeUpdateUserProfileUseCase() {
	const userRepository = new PrismaUserRepository();
	const updateUserProfileUseCase = new UpdateUserProfileUseCase(userRepository);

	return updateUserProfileUseCase;
}
