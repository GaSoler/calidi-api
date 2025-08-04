import type { FastifyReply, FastifyRequest } from "fastify";
import { replySuccess } from "@/http/helpers/reply";
import { makeListServicesUseCase } from "@/use-cases/service/factories/make-list-services-use-case";

export async function listServices(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const listServicesUseCase = makeListServicesUseCase();

	const { services } = await listServicesUseCase.execute();

	return replySuccess(reply, {
		services: services.map((service) => ({
			id: service.id,
			name: service.name,
			price: service.price,
			duration: service.duration,
		})),
	});
}
