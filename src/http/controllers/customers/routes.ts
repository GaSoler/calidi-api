import type { FastifyInstance } from "fastify";
import { authOnly, publicRoute } from "@/http/helpers/route-protection";
import { createAppointment } from "./create-appointment";
import { listAvailableBarbers } from "./list-available-barbers";
import { listAvailableServices } from "./list-available-services";
import { listAvailableTimes } from "./list-available-times";

export async function customerRoutes(app: FastifyInstance) {
	app.get("/services", publicRoute(), listAvailableServices);
	app.get("/barbers", publicRoute(), listAvailableBarbers);
	app.get("/barbers/:barberId/times", publicRoute(), listAvailableTimes);
	app.post("/appointments", publicRoute(), createAppointment);
}
