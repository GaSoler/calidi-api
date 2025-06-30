import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UnableToSendOtpError } from "@/use-cases/errors/unable-to-send-otp-error";
import { makeSendLoginOtpUseCase } from "@/use-cases/factories/make-send-login-otp-use-case";

export async function sendOtp(request: FastifyRequest, reply: FastifyReply) {
	const sendOtpBodySchema = z.object({
		phone: z.string().min(10, "Telefone inválido"),
	});

	const { phone } = sendOtpBodySchema.parse(request.body);

	try {
		const sendOtpUseCase = makeSendLoginOtpUseCase();

		await sendOtpUseCase.execute({ phone });

		return reply.status(200).send({ message: "OTP enviado com sucesso!" });
	} catch (err) {
		if (err instanceof UnableToSendOtpError) {
			return reply.status(400).send({ message: err.message });
		}

		throw err;
	}
}
