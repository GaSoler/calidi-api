import type { FastifyInstance } from "fastify";
import { adminOnly, authOnly } from "@/http/helpers/route-protection";
import { createService } from "./create-service";
import { deleteService } from "./delete-service";
import { getServiceById } from "./get-service-by-id";
import { listServices } from "./list-services";
import { updateService } from "./update-service";

export async function serviceRoutes(app: FastifyInstance) {
	app.get("", authOnly(), listServices);
	app.get("/:id", authOnly(), getServiceById);
	app.post("", adminOnly(), createService);
	app.patch("/:id", adminOnly(), updateService);
	app.delete("/:id", adminOnly(), deleteService);
}
