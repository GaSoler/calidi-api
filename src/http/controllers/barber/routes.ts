import type { FastifyInstance } from "fastify";
import { rolesOnly } from "@/http/helpers/route-protection";
import { availableSlots } from "./available-slots";
import { listBarbers } from "./list-barbers";

export async function barberRoutes(app: FastifyInstance) {
	app.get("", rolesOnly(["ADMIN", "CUSTOMER"]), listBarbers);
	app.get(
		"/:barberId/available-slots",
		rolesOnly(["ADMIN", "CUSTOMER"]),
		availableSlots,
	);
}
