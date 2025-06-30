import type { FastifyReply, FastifyRequest } from "fastify";
import { NotFoundUserError } from "@/use-cases/errors/not-found-user-error";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";

export async function me(request: FastifyRequest, reply: FastifyReply) {
	const userId = request.user.sub;

	try {
		const getUserProfileUseCase = makeGetUserProfileUseCase();

		const { user } = await getUserProfileUseCase.execute({ userId });
		return reply.status(200).send({ user });
	} catch (err) {
		if (err instanceof NotFoundUserError) {
			return reply.status(400).send({ message: err.message });
		}

		throw err;
	}
}
