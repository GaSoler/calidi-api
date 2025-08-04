import { PrismaRoleRepository } from "@/repositories/prisma/prisma-role-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterCustomerUseCase } from "../register-customer";

export function makeRegisterCustomerUseCase() {
	const userRepository = new PrismaUserRepository();
	const roleRepository = new PrismaRoleRepository();

	const registerCustomerUseCase = new RegisterCustomerUseCase(
		userRepository,
		roleRepository,
	);

	return registerCustomerUseCase;
}
