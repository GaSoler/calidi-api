import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastifyRateLimit from "@fastify/rate-limit";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { authRoutes } from "./http/controllers/auth/routes";
import { userRoutes } from "./http/controllers/user/routes";

export const app = fastify();

app.register(fastifyCookie);

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "accessToken",
		signed: false,
	},
	sign: {
		expiresIn: "1h",
	},
});

app.register(fastifyRateLimit);

app.register(authRoutes, { prefix: "/auth" });
app.register(userRoutes, { prefix: "/user" });

app.setErrorHandler((error, _, reply) => {
	if ((error as any).statusCode) {
		return reply.status((error as any).statusCode).send(error);
	}

	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: "Validation error.", issues: error.format() });
	}

	if (env.NODE_ENV !== "production") {
		console.error(error);
	} else {
		// TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
	}

	return reply.status(500).send({ message: "Internal server error." });
});
