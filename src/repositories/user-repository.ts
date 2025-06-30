import type { User } from "@prisma/client";

export type UserWithRoles = {
	id: string;
	name: string | null;
	phone: string;
	email: string | null;
	createdAt: Date;
	updatedAt: Date;
	roles: {
		id: string;
		name: string;
	}[];
};

export interface UserRepository {
	create(data: {
		name?: string;
		phone: string;
		email?: string;
		roleId: string;
	}): Promise<User>;
	findByPhone(phone: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
	findByIdWithRoles(id: string): Promise<UserWithRoles | null>;
	findByPhoneWithRoles(id: string): Promise<UserWithRoles | null>;
	update(
		id: string,
		data: Partial<{
			name: string;
			email: string;
		}>,
	): Promise<User>;
}
