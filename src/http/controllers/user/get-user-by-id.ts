import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeGetUserByIdUseCase } from "@/use-cases/user/factories/make-get-user-by-id-use-case";

export async function getUserById(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const getUserByIdParamsSchema = z.object({
		id: z.string().uuid(),
	});

	const { id } = getUserByIdParamsSchema.parse(request.params);

	const getUserByIdUseCase = makeGetUserByIdUseCase();

	const { user } = await getUserByIdUseCase.execute({ userId: id });

	return replySuccess(reply, {
		user,
	});
}
