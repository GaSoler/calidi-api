import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeListAvailableTimesUseCase } from "@/use-cases/customer/factories/make-list-available-times-use-case";

export async function listAvailableTimes(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const listAvailableTimesParamsSchema = z.object({
		barberId: z.string().uuid(),
	});

	const listAvailableTimesQuerySchema = z.object({
		date: z
			.string()
			.refine((date) => !isNaN(Date.parse(date)), {
				message: "Invalid date format. Expected format: YYYY-MM-DD",
			})
			.transform((date) => {
				const [year, month, day] = date.split("-").map(Number);
				return new Date(year, month - 1, day);
			}),
	});

	const { barberId } = listAvailableTimesParamsSchema.parse(request.params);
	const { date } = listAvailableTimesQuerySchema.parse(request.query);

	const listAvailableTimesUseCase = makeListAvailableTimesUseCase();

	const { timeSlots } = await listAvailableTimesUseCase.execute({
		barberId,
		date,
	});

	return replySuccess(reply, {
		timeSlots,
	});
}
