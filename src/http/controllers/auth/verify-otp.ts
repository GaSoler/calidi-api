import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { replySuccess } from "@/http/helpers/reply";
import { makeVerifyOtpUseCase } from "@/use-cases/auth/factories/make-verify-otp-use-case";

export async function verifyOtp(request: FastifyRequest, reply: FastifyReply) {
	const verifyOtpBodySchema = z.object({
		phone: z.string(),
		code: z.string().length(6),
	});

	const { code, phone } = verifyOtpBodySchema.parse(request.body);

	const verifyOtpUseCase = makeVerifyOtpUseCase();

	const { user } = await verifyOtpUseCase.execute({
		code,
		phone,
	});

	const accessToken = await reply.jwtSign(
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

	return replySuccess(
		reply.setCookie("refreshToken", refreshToken, {
			path: "/",
			secure: true,
			sameSite: true,
			httpOnly: true,
		}),
		{
			accessToken,
		},
	);
}
