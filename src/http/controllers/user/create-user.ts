import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeCreateUserUseCase } from "@/use-cases/user/factories/make-create-user-use-case";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
	const createUserBodySchema = z.object({
		name: z.string().min(1),
		email: z.string().email(),
		phone: z.string(),
		roleName: z.string(),
	});

	const { name, email, phone, roleName } = createUserBodySchema.parse(
		request.body,
	);

	const createUserUseCase = makeCreateUserUseCase();

	const { user } = await createUserUseCase.execute({
		name,
		email,
		phone,
		roleName,
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
