import type { FastifyReply, FastifyRequest } from "fastify";
import { replySuccess } from "@/http/helpers/reply";

export async function refreshToken(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	await request.jwtVerify({ onlyCookie: true });

	const { roles } = request.user;

	const accessToken = await reply.jwtSign(
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

	return replySuccess(
		reply.setCookie("refreshToken", refreshToken, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: true,
		}),
		{
			accessToken,
		},
	);
}
