import type { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRoles(allowedRoles: string[]) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		console.log("request.user:", request.user);
		const { roles } = request.user;

		if (!roles || roles.length === 0) {
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

		const hasAnyRole = allowedRoles.some((role) => roles.includes(role));

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
