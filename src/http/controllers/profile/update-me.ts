import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeUpdateUserUseCase } from "@/use-cases/user/factories/make-update-user-use-case";

export async function updateMe(request: FastifyRequest, reply: FastifyReply) {
	const updateMeBodySchema = z.object({
		name: z.string().min(1),
		email: z.string().email(),
	});

	const userId = request.user.sub;
	const data = updateMeBodySchema.parse(request.body);

	const updateMeUseCase = makeUpdateUserUseCase();

	const { user } = await updateMeUseCase.execute({
		userId,
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
