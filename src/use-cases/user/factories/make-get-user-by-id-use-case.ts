import { PrismaRoleRepository } from "@/repositories/prisma/prisma-role-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUserByIdUseCase } from "../get-user-by-id";

export function makeGetUserByIdUseCase() {
	const userRepository = new PrismaUserRepository();
	const roleRepository = new PrismaRoleRepository();

	const getUserByIdUseCase = new GetUserByIdUseCase(
		userRepository,
		roleRepository,
	);

	return getUserByIdUseCase;
}
