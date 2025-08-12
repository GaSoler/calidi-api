import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verifyUserRoles } from "@/http/middlewares/verify-user-roles";

export function authOnly() {
	return {
		preValidation: [verifyJwt],
	};
}

export function rolesOnly(roles: string[]) {
	return {
		preValidation: [verifyJwt, verifyUserRoles(roles)],
	};
}

export function adminOnly() {
	return rolesOnly(["ADMIN"]);
}

export function barberOnly() {
	return rolesOnly(["BARBER"]);
}

export function customerOnly() {
	return rolesOnly(["CUSTOMER"]);
}

export function publicRoute() {
	return {}; // Sem autenticação
}
