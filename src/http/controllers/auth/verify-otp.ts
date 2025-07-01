import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidOtpError } from "@/use-cases/errors/invalid-otp-error";
import { makeVerifyLoginOtpUseCase } from "@/use-cases/factories/make-verify-login-otp-use-case";

export async function verifyOtp(request: FastifyRequest, reply: FastifyReply) {
	const verifyOtpBodySchema = z.object({
		phone: z.string(),
		code: z.string().length(6),
	});

	const { code, phone } = verifyOtpBodySchema.parse(request.body);

	try {
		const verifyLoginOtpUseCase = makeVerifyLoginOtpUseCase();

		const { user } = await verifyLoginOtpUseCase.execute({
			code,
			phone,
		});

		const token = await reply.jwtSign(
			{
				roles: user.roles,
			},
			{
				sign: {
					sub: user.id,
				},
			},
		);

		const refreshToken = await reply.jwtSign(
			{
				role: user.roles,
			},
			{
				sign: {
					sub: user.id,
					expiresIn: "7d",
				},
			},
		);

		return reply
			.setCookie("refreshToken", refreshToken, {
				path: "/",
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({
				token,
			});
	} catch (err) {
		if (err instanceof InvalidOtpError) {
			return reply.status(400).send({ message: err.message });
		}

		throw err;
	}
}
