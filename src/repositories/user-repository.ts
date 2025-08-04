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
	findAll(): Promise<User[]>;
	findById(id: string): Promise<User | null>;
	findByPhone(phone: string): Promise<User | null>;
	findByRole(roleName: string): Promise<User[]>;
	create(data: {
		name: string;
		phone: string;
		email: string;
		roleId: string;
	}): Promise<User>;
	update(
		id: string,
		data: Partial<{
			name: string;
			email: string;
		}>,
	): Promise<User>;
	delete(id: string): Promise<void>;

	findByIdWithRoles(id: string): Promise<UserWithRoles | null>;
	findByPhoneWithRoles(id: string): Promise<UserWithRoles | null>;

	findBarbers(): Promise<User[]>;
}
