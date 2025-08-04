import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeGetAvailableSlotsByDateUseCase } from "@/use-cases/factories/entities/barber-availability/make-get-available-slots-by-date-use-case";

export async function availableSlots(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const availableSlotsParamsSchema = z.object({
		barberId: z.string().uuid(),
	});

	const availableSlotsQuerySchema = z.object({
		date: z.string().refine((date) => !isNaN(Date.parse(date)), {
			message: "Invalid date format. Expected format: YYYY-MM-DD",
		}),
	});

	const { barberId } = availableSlotsParamsSchema.parse(request.params);
	const { date } = availableSlotsQuerySchema.parse(request.query);

	const getAvailableSlotsByDateUseCase = makeGetAvailableSlotsByDateUseCase();

	const { slots } = await getAvailableSlotsByDateUseCase.execute({
		barberId,
		date,
	});

	return replySuccess(reply, {
		slots,
	});
}
