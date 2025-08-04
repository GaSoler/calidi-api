import type { FastifyInstance } from "fastify";
import { authOnly } from "@/http/helpers/route-protection";
import { me } from "./me";
import { updateMe } from "./update-me";

export async function profileRoutes(app: FastifyInstance) {
	app.get("", authOnly(), me);
	app.patch("", authOnly(), updateMe);
}
