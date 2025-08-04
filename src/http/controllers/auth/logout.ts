import type { FastifyReply, FastifyRequest } from "fastify";
import { replySuccess } from "@/http/helpers/reply";

export async function logout(request: FastifyRequest, reply: FastifyReply) {
	return replySuccess(reply.clearCookie("refreshToken", { path: "/" }), {
		message: "Deslogado com sucesso",
	});
}
