import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { ListBarbersUseCase } from "../list-barbers";

export function makeListBarbersUseCase() {
	const userRepository = new PrismaUserRepository();

	const listBarbersUseCase = new ListBarbersUseCase(userRepository);

	return listBarbersUseCase;
}
