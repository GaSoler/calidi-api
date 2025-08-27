import { prisma } from "@/lib/prisma";
import type { User, UserWithRoles } from "@/types/repository";
import type { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
	async findById(id: string): Promise<UserWithRoles | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				roles: {
					include: {
						role: true,
					},
				},
			},
		});

		return user;
	}

	async findByPhone(phone: string): Promise<UserWithRoles | null> {
		const user = await prisma.user.findUnique({
			where: {
				phone,
			},
			include: {
				roles: {
					include: {
						role: true,
					},
				},
			},
		});

		return user;
	}

	async findByRole(roleName: string): Promise<User[]> {
		const users = await prisma.user.findMany({
			where: {
				roles: {
					some: {
						role: {
							name: roleName,
						},
					},
				},
			},
		});

		return users;
	}

	async create(data: {
		name: string;
		phone: string;
		email: string;
		roleId: string;
	}): Promise<UserWithRoles> {
		const { name, phone, email, roleId } = data;

		const user = await prisma.user.create({
			data: {
				name,
				phone,
				email,
				roles: {
					create: [{ roleId }],
				},
			},
			include: {
				roles: {
					include: {
						role: true,
					},
				},
			},
		});

		return user;
	}

	async update(
		id: string,
		data: Partial<{
			name: string;
			email: string;
		}>,
	): Promise<User> {
		const updatedUser = await prisma.user.update({
			where: { id },
			data,
		});

		return updatedUser;
	}

	async delete(id: string): Promise<void> {
		await prisma.user.delete({
			where: { id },
		});
	}
}
