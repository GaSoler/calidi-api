import type { FastifyReply, FastifyRequest } from "fastify";
import { replySuccess } from "@/http/helpers/reply";
import { makeGetNextAppointmentDetailsUseCase } from "@/use-cases/customer/factories/make-get-next-appointment-details-use-case";

export async function getNextAppointment(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const customerId = request.user.sub;
	const getNextAppointmentDetailsUseCase =
		makeGetNextAppointmentDetailsUseCase();

	const { appointment } = await getNextAppointmentDetailsUseCase.execute({
		customerId,
	});

	return replySuccess(
		reply,
		{
			appointment,
		},
		200,
	);
}
