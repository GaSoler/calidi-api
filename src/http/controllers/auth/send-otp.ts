import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeSendOtpUseCase } from "@/use-cases/auth/factories/make-send-otp-use-case";

export async function sendOtp(request: FastifyRequest, reply: FastifyReply) {
	const sendOtpBodySchema = z.object({
		phone: z.string().min(10, "Telefone inválido"),
	});

	const { phone } = sendOtpBodySchema.parse(request.body);

	const sendOtpUseCase = makeSendOtpUseCase();

	await sendOtpUseCase.execute({ phone });

	return replySuccess(reply, {
		message: "OTP enviado com sucesso!",
	});
}
