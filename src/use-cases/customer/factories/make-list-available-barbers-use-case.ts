import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { ListAvailableBarbersUseCase } from "../list-available-barbers";

export function makeListAvailableBarbersUseCase() {
	const userRepository = new PrismaUserRepository();

	const listBarbersUseCase = new ListAvailableBarbersUseCase(userRepository);

	return listBarbersUseCase;
}
