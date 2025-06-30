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
}
