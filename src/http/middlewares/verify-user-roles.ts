import type { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRoles(allowedRoles: string[]) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const user = request.user as { role?: { id: string; name: string }[] };

		const roles = user.role;

		if (!roles || !Array.isArray(roles) || roles.length === 0) {
			return reply.status(403).send({
				data: null,
				error: {
					message: "Usuário sem permissões definidas.",
					code: "FORBIDDEN",
					status: 403,
					details: null,
				},
			});
		}

		const userRoleNames = roles.map((role) => role.name);

		const hasAnyRole = allowedRoles.some((role) =>
			userRoleNames.includes(role),
		);

		if (!hasAnyRole) {
			return reply.status(403).send({
				data: null,
				error: {
					message: "Você não tem permissão para acessar este recurso.",
					code: "FORBIDDEN",
					status: 403,
					details: null,
				},
			});
		}
	};
}
