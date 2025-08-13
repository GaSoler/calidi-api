import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeCreateAppointmentUseCase } from "@/use-cases/customer/factories/make-create-appointment-use-case";

export async function createAppointment(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createAppointmentBodySchema = z.object({
		customerId: z.string().uuid(),
		serviceId: z.string().uuid(),
		barberId: z.string().uuid(),
		appointmentDateTime: z
			.string()
			.refine(
				(date) =>
					!isNaN(Date.parse(date)) &&
					/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(date),
				{
					message:
						"Invalid datetime format. Expected format: YYYY-MM-DDTHH:mm or YYYY-MM-DDTHH:mm:ss",
				},
			)
			.transform((date) => {
				// Parse manual para garantir horário local e evitar timezone issues
				const [datePart, timePart] = date.split("T");
				const [year, month, day] = datePart.split("-").map(Number);
				const [hour, minute, second = 0] = timePart.split(":").map(Number);

				return new Date(year, month - 1, day, hour, minute, second);
			}),
	});

	// const customerIdToken = request.user.sub;

	const { customerId, serviceId, barberId, appointmentDateTime } =
		createAppointmentBodySchema.parse(request.body);

	const createAppointmentUseCase = makeCreateAppointmentUseCase();

	const { appointment } = await createAppointmentUseCase.execute({
		customerId,
		serviceId,
		barberId,
		appointmentDateTime,
	});

	return replySuccess(reply, { appointment }, 201);
}
