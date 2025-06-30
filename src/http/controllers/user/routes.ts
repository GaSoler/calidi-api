import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { me } from "./me";

export async function userRoutes(app: FastifyInstance) {
	app.get("/me", { onRequest: [verifyJwt] }, me);
}
