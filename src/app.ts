import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyRateLimit from "@fastify/rate-limit";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { authRoutes } from "./http/controllers/auth/routes";
import { barberRoutes } from "./http/controllers/barber/routes";
import { customerRoutes } from "./http/controllers/customers/routes";
import { profileRoutes } from "./http/controllers/profile/routes";
import { serviceRoutes } from "./http/controllers/service/routes";
import { userRoutes } from "./http/controllers/user/routes";
import { AppError } from "./use-cases/errors/app-error";

export const app = fastify();

app.register(fastifyCors, {
	origin: ["http://localhost:5173"],
	credentials: true,
});

app.register(fastifyCookie);

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: "1h",
	},
});

app.register(fastifyRateLimit);

app.register(authRoutes, { prefix: "/auth" });
app.register(profileRoutes, { prefix: "/profile" });
app.register(customerRoutes, { prefix: "/customers" });
// app.register(serviceRoutes, { prefix: "/services" });
// app.register(userRoutes, { prefix: "/users" });
// app.register(barberRoutes, { prefix: "/barbers" });

app.setErrorHandler((error, _, reply) => {
	if (error instanceof AppError) {
		return reply.status(error.status).send({
			data: null,
			error: {
				message: error.message,
				code: error.code,
				status: error.status,
				details: error.details ?? null,
			},
		});
	}

	if (error instanceof ZodError) {
		return reply.status(400).send({
			data: null,
			error: {
				message: "Validation error.",
				code: "VALIDATION_ERROR",
				status: 400,
				details: error.format(),
			},
		});
	}

	if (env.NODE_ENV !== "production") {
		console.error(error);
	} else {
		// TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
	}

	return reply.status(500).send({
		data: null,
		error: {
			message: "Internal server error.",
			code: "INTERNAL_SERVER_ERROR",
			status: 500,
			details: null,
		},
	});
});
