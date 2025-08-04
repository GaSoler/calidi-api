import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeGetServiceByIdUseCase } from "@/use-cases/service/factories/make-get-service-by-id-use-case";

export async function getServiceById(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const getServiceByIdParamsSchema = z.object({
		id: z.string().uuid(),
	});

	const { id } = getServiceByIdParamsSchema.parse(request.params);

	const getServiceByIdUseCase = makeGetServiceByIdUseCase();

	const { service } = await getServiceByIdUseCase.execute({ serviceId: id });

	return replySuccess(reply, {
		service: {
			id: service.id,
			name: service.name,
			price: service.price,
			duration: service.duration,
		},
	});
}
