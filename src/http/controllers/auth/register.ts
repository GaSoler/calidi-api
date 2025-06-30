import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUserUseCase } from "@/use-cases/factories/make-register-user-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		phone: z.string().min(10).max(15),
		name: z.string().min(1).optional(),
		email: z.string().email().optional(),
	});

	const { phone, name, email } = registerBodySchema.parse(request.body);

	const registerUserUseCase = makeRegisterUserUseCase();

	const { user } = await registerUserUseCase.execute({ phone, name, email });

	return reply.status(201).send({
		name: user.name,
		phone: user.phone,
		email: user.email,
	});
}
