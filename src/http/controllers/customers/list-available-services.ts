import type { FastifyReply, FastifyRequest } from "fastify";
import { replySuccess } from "@/http/helpers/reply";
import { makeListAvailableServicesUseCase } from "@/use-cases/customer/factories/make-list-available-services-use-case";

export async function listAvailableServices(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const listAvailableServicesUseCase = makeListAvailableServicesUseCase();

	const { services } = await listAvailableServicesUseCase.execute();

	return replySuccess(reply, {
		services,
	});
}
