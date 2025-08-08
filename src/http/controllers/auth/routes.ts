import type { FastifyInstance } from "fastify";
import { authOnly, publicRoute } from "@/http/helpers/route-protection";
import { logout } from "./logout";
import { refreshToken } from "./refresh";
import { register } from "./register";
import { sendOtp } from "./send-otp";
import { verifyOtp } from "./verify-otp";

export async function authRoutes(app: FastifyInstance) {
	app.post("/register", publicRoute(), register);

	// app.post(
	// 	"/send-otp",
	// 	{
	// 		...publicRoute(),
	// 		config: {
	// 			rateLimit: {
	// 				max: 5,
	// 				timeWindow: "1 hour",
	// 				keyGenerator: (req) => {
	// 					const body = (req.body as { phone?: string } | undefined) ?? {};
	// 					return body.phone ?? req.ip;
	// 				},
	// 				errorResponseBuilder: (_req, context) => ({
	// 					statusCode: context.statusCode,
	// 					error: "Too Many Requests",
	// 					message: "Limite de envios de OTP atingido. Tente mais tarde.",
	// 				}),
	// 			},
	// 		},
	// 	},
	// 	sendOtp,
	// );

	app.post("/send-otp", publicRoute(), sendOtp);

	app.post("/verify-otp", publicRoute(), verifyOtp);

	app.post("/refresh", publicRoute(), refreshToken);

	app.post("/logout", authOnly(), logout);
}
