import { PrismaRoleRepository } from "@/repositories/prisma/prisma-role-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { UpdateUserUseCase } from "../update-user";

export function makeUpdateUserUseCase() {
	const userRepository = new PrismaUserRepository();
	const roleRepository = new PrismaRoleRepository();

	const updateUserUseCase = new UpdateUserUseCase(
		userRepository,
		roleRepository,
	);

	return updateUserUseCase;
}
