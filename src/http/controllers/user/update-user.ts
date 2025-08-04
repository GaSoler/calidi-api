import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeUpdateUserUseCase } from "@/use-cases/user/factories/make-update-user-use-case";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
	const updateUserParamsSchema = z.object({
		id: z.string().uuid(),
	});

	const updateUserBodySchema = z.object({
		name: z.string().min(1),
		email: z.string().email(),
	});

	const { id } = updateUserParamsSchema.parse(request.params);
	const data = updateUserBodySchema.parse(request.body);

	const updateUserUseCase = makeUpdateUserUseCase();

	const { user } = await updateUserUseCase.execute({
		userId: id,
		data,
	});

	return replySuccess(reply, {
		user: {
			name: user.name,
			email: user.email,
			phone: user.phone,
			roles: user.roles,
		},
	});
}
