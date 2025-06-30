import { PrismaRoleRepository } from "@/repositories/prisma/prisma-role-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUserUseCase } from "../register-user";

export function makeRegisterUserUseCase() {
	const userRepository = new PrismaUserRepository();
	const roleRepository = new PrismaRoleRepository();

	const registerUserUserCase = new RegisterUserUseCase(
		userRepository,
		roleRepository,
	);

	return registerUserUserCase;
}
