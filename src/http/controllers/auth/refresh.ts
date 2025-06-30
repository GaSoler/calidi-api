import type { FastifyReply, FastifyRequest } from "fastify";
import { revokedTokens } from "@/lib/auth";

export async function refreshToken(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	await request.jwtVerify({ onlyCookie: true });

	const currentRefresh = request.cookies.refreshToken as string;

	if (revokedTokens.has(currentRefresh)) {
		return reply.status(401).send({ message: "Refresh token revogado" });
	}

	const { sub: userId, roles } = request.user;

	const newAccessToken = await reply.jwtSign(
		{ roles },
		{
			sign: { sub: userId },
		},
	);

	const newRefreshToken = await reply.jwtSign(
		{ roles },
		{
			sign: { sub: userId, expiresIn: "7d" },
		},
	);

	revokedTokens.add(currentRefresh);

	return reply
		.setCookie("accessToken", newAccessToken, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: true,
		})
		.setCookie("refreshToken", newRefreshToken, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: true,
		})
		.status(200)
		.send({ accessToken: newAccessToken });
}
