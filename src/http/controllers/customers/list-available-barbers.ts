import type { FastifyReply, FastifyRequest } from "fastify";
import { replySuccess } from "@/http/helpers/reply";
import { makeListAvailableBarbersUseCase } from "@/use-cases/customer/factories/make-list-available-barbers-use-case";

export async function listAvailableBarbers(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const listAvailableBarbersUseCase = makeListAvailableBarbersUseCase();

	const { barbers } = await listAvailableBarbersUseCase.execute();

	return replySuccess(reply, {
		barbers,
	});
}
