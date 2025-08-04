import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeCreateServiceUseCase } from "@/use-cases/service/factories/make-create-service-use-case";

export async function createService(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createServiceBodySchema = z.object({
		name: z.string().min(1),
		price: z.number(),
		duration: z.number().min(1),
	});

	const { name, price, duration } = createServiceBodySchema.parse(request.body);

	const createServiceUseCase = makeCreateServiceUseCase();

	const { service } = await createServiceUseCase.execute({
		name,
		price,
		duration,
	});

	return replySuccess(reply, {
		service: {
			id: service.id,
			name: service.name,
			price: service.price,
			duration: service.duration,
		},
	});
}
