import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeUpdateServiceUseCase } from "@/use-cases/service/factories/make-update-service-use-case";

export async function updateService(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const updateServiceParamsSchema = z.object({
		id: z.string().uuid(),
	});

	const updateServiceBodySchema = z.object({
		name: z.string().min(1).optional(),
		duration: z.number().min(1).optional(),
		price: z.number().min(0).optional(),
	});

	const { id } = updateServiceParamsSchema.parse(request.params);
	const data = updateServiceBodySchema.parse(request.body);

	const updateServiceUseCase = makeUpdateServiceUseCase();

	const { service } = await updateServiceUseCase.execute({
		serviceId: id,
		data,
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
