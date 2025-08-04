import type { FastifyReply, FastifyRequest } from "fastify";
import { replySuccess } from "@/http/helpers/reply";
import { makeListBarbersUseCase } from "@/use-cases/factories/entities/user/make-list-barbers-use-case";

export async function listBarbers(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const listBarbersUseCase = makeListBarbersUseCase();

	const { barbers } = await listBarbersUseCase.execute();

	return replySuccess(reply, {
		barbers: barbers.map((barber) => ({
			id: barber.id,
			name: barber.name,
		})),
	});
}
