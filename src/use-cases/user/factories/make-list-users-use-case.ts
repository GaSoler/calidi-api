import { PrismaRoleRepository } from "@/repositories/prisma/prisma-role-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { ListUsersUseCase } from "../list-users";

export function makeListUsersUseCase() {
	const userRepository = new PrismaUserRepository();
	const roleRepository = new PrismaRoleRepository();

	const listUsersUseCase = new ListUsersUseCase(userRepository, roleRepository);

	return listUsersUseCase;
}
