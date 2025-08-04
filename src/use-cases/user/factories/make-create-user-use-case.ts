import { PrismaRoleRepository } from "@/repositories/prisma/prisma-role-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../create-user";

export function makeCreateUserUseCase() {
	const userRepository = new PrismaUserRepository();
	const roleRepository = new PrismaRoleRepository();

	const createUserUseCase = new CreateUserUseCase(
		userRepository,
		roleRepository,
	);

	return createUserUseCase;
}
