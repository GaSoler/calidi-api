import type { UserRepository } from "@/repositories/user-repository";
import type { Barber } from "@/types/barber";

interface ListBarbersUseCaseResponse {
	barbers: Barber[];
}

export class ListBarbersUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<ListBarbersUseCaseResponse> {
		const barbers = (await this.userRepository.findByRole("BARBER")).map(
			(barber) => ({
				id: barber.id,
				name: barber.name,
				email: barber.email,
				phone: barber.phone,
			}),
		);

		return { barbers };
	}
}
