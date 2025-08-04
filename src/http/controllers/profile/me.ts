import type { FastifyReply, FastifyRequest } from "fastify";
import { replySuccess } from "@/http/helpers/reply";
import { makeGetUserByIdUseCase } from "@/use-cases/user/factories/make-get-user-by-id-use-case";

export async function me(request: FastifyRequest, reply: FastifyReply) {
	const userId = request.user.sub;
	const getUserByIdUseCase = makeGetUserByIdUseCase();

	const { user } = await getUserByIdUseCase.execute({ userId });

	return replySuccess(reply, {
		user,
	});
}
