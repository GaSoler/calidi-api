import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeGetAppointmentDetailsUseCase } from "@/use-cases/customer/factories/make-get-appointment-details-use-case";

export async function getAppointment(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const ParamsSchema = z.object({
		appointmentId: z.string().uuid(),
	});

	const { appointmentId } = ParamsSchema.parse(request.params);

	const getAppointmentDetailsUseCase = makeGetAppointmentDetailsUseCase();

	const { appointment } = await getAppointmentDetailsUseCase.execute({
		appointmentId,
	});

	return replySuccess(
		reply,
		{
			appointment,
		},
		200,
	);
}
