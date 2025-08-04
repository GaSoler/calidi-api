import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeDeleteUserUseCase } from "@/use-cases/user/factories/make-delete-user-use-case";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
	const deleteUserParamsSchema = z.object({
		id: z.string().uuid(),
	});

	const { id } = deleteUserParamsSchema.parse(request.params);

	const deleteUserUseCase = makeDeleteUserUseCase();

	await deleteUserUseCase.execute({
		userId: id,
	});

	return replySuccess(reply, {}, 204);
}
