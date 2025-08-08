import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeRegisterCustomerUseCase } from "@/use-cases/auth/factories/make-register-customer-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		phone: z.string().min(10).max(15),
		name: z.string().min(1),
		email: z.string().email(),
	});

	const { phone, name, email } = registerBodySchema.parse(request.body);
	const registerCustomerUseCase = makeRegisterCustomerUseCase();

	const { user } = await registerCustomerUseCase.execute({
		phone,
		name,
		email,
	});

	return replySuccess(
		reply,
		{
			user,
		},
		201,
	);
}
