import type { FastifyReply, FastifyRequest } from "fastify";
import { UnableToLogoutError } from "@/use-cases/errors/unable-to-logout-error";

export async function logout(request: FastifyRequest, reply: FastifyReply) {
	try {
		reply
			.clearCookie("accessToken", { path: "/" })
			.clearCookie("refreshToken", { path: "/" })
			.status(200)
			.send({ message: "Deslogado com sucesso" });
	} catch (err) {
		if (err instanceof UnableToLogoutError) {
			return reply.status(400).send({ message: err.message });
		}

		throw err;
	}
}
