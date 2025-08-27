import type { Role } from "@/types/repository";

export interface RoleRepository {
	findByName(name: string): Promise<Role | null>;
	findByUserId(userId: string): Promise<Role[]>;
}
