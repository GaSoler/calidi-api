import type { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { UserRepository, UserWithRoles } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
	async findAll(): Promise<User[]> {
		const users = await prisma.user.findMany();

		return users;
	}

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	async findByPhone(phone: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				phone,
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
			include: {
				roles: {
					include: {
						role: true,
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
	}): Promise<User> {
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
			include: { roles: true },
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

	async findByIdWithRoles(id: string): Promise<UserWithRoles | null> {
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

		if (!user) {
			return null;
		}

		return {
			id: user.id,
			name: user.name,
			phone: user.phone,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			roles: user.roles.map((userRole) => ({
				id: userRole.role.id,
				name: userRole.role.name,
			})),
		};
	}

	async findByPhoneWithRoles(phone: string): Promise<UserWithRoles | null> {
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

		if (!user) {
			return null;
		}

		return {
			id: user.id,
			name: user.name,
			phone: user.phone,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			roles: user.roles.map((userRole) => ({
				id: userRole.role.id,
				name: userRole.role.name,
			})),
		};
	}

	async findBarbers(): Promise<User[]> {
		const barbers = await prisma.user.findMany({
			where: {
				roles: {
					some: {
						role: {
							name: "BARBER",
						},
					},
				},
			},
		});

		return barbers;
	}
}
