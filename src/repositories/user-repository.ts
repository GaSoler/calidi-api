import type { User, UserWithRoles } from "@/types/repository";

export interface UserRepository {
	findById(id: string): Promise<UserWithRoles | null>;
	findByPhone(phone: string): Promise<UserWithRoles | null>;
	findByRole(roleName: string): Promise<User[]>;
	create(data: {
		name: string;
		phone: string;
		email: string;
		roleId: string;
	}): Promise<UserWithRoles>;
	update(
		id: string,
		data: Partial<{
			name: string;
			email: string;
		}>,
	): Promise<User>;
	delete(id: string): Promise<void>;
}
