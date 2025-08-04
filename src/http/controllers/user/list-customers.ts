import type { FastifyReply, FastifyRequest } from "fastify";
import { replySuccess } from "@/http/helpers/reply";
import { makeListUsersUseCase } from "@/use-cases/user/factories/make-list-users-use-case";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
	const listUsersUseCase = makeListUsersUseCase();

	const { users } = await listUsersUseCase.execute({ roleName: "CUSTOMER" });

	return replySuccess(reply, {
		users,
	});
}
