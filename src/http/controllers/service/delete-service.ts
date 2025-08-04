import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeDeleteServiceUseCase } from "@/use-cases/service/factories/make-delete-service-use-case";

export async function deleteService(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const deleteServiceParamsSchema = z.object({
		id: z.string().uuid(),
	});

	const { id } = deleteServiceParamsSchema.parse(request.params);

	const deleteServiceUseCase = makeDeleteServiceUseCase();

	await deleteServiceUseCase.execute({
		serviceId: id,
	});

	return replySuccess(reply, {}, 204);
}
