import type { Role } from "@prisma/client";

export interface RoleRepository {
	findByName(name: string): Promise<Role | null>;
	findByUserId(userId: string): Promise<Role[]>;
}
