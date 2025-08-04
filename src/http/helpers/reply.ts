import type { FastifyReply } from "fastify";

export function replySuccess(reply: FastifyReply, data: unknown, status = 200) {
	if (status === 204) {
		return reply.status(204).send();
	}

	return reply.status(status).send({
		data,
		error: null,
	});
}

export function replyError(
	reply: FastifyReply,
	{
		message,
		code,
		status = 400,
		details = null,
	}: {
		message: string;
		code?: string;
		status?: number;
		details?: unknown;
	},
) {
	return reply.status(status).send({
		data: null,
		error: {
			message,
			code,
			status,
			details,
		},
	});
}
