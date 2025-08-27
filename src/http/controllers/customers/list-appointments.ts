import type { FastifyReply, FastifyRequest } from "fastify";
import { replySuccess } from "@/http/helpers/reply";
import { makeListCustomerAppointmentsUseCase } from "@/use-cases/customer/factories/make-list-customer-appointments-use-case";

export async function listAppointments(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const customerId = request.user.sub;
	const listCustomerAppointmentsUseCase = makeListCustomerAppointmentsUseCase();

	const { appointments } = await listCustomerAppointmentsUseCase.execute({
		customerId,
	});

	return replySuccess(
		reply,
		{
			appointments,
		},
		200,
	);
}
