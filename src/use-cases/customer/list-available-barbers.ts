import type { UserRepository } from "@/repositories/user-repository";
import type { Barber } from "@/types/barber";

interface ListAvailableBarbersUseCaseResponse {
	barbers: Barber[];
}

export class ListAvailableBarbersUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<ListAvailableBarbersUseCaseResponse> {
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
