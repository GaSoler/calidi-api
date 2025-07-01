import type { FastifyReply, FastifyRequest } from "fastify";
import { revokedTokens } from "@/lib/auth";

export async function refreshToken(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	await request.jwtVerify({ onlyCookie: true });

	const { roles } = request.user;

	const token = await reply.jwtSign(
		{ roles },
		{
			sign: {
				sub: request.user.sub,
			},
		},
	);

	const refreshToken = await reply.jwtSign(
		{ roles },
		{
			sign: {
				sub: request.user.sub,
				expiresIn: "7d",
			},
		},
	);

	return reply
		.setCookie("refreshToken", refreshToken, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: true,
		})
		.status(200)
		.send({ token });
}
