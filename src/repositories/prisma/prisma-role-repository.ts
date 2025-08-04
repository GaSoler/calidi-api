import type { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { RoleRepository } from "../role-repository";

export class PrismaRoleRepository implements RoleRepository {
	async findByName(name: string): Promise<Role | null> {
		const role = await prisma.role.findUnique({
			where: { name },
		});

		return role;
	}

	async findByUserId(userId: string): Promise<Role[]> {
		const roles = await prisma.role.findMany({
			where: {
				users: {
					some: {
						userId,
					},
				},
			},
		});

		return roles;
	}
}
