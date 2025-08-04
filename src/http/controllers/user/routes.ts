import type { FastifyInstance } from "fastify";
import { adminOnly, authOnly } from "@/http/helpers/route-protection";
import { me } from "../profile/me";
import { updateMe } from "../profile/update-me";
import { createUser } from "./create-user";
import { deleteUser } from "./delete-user";
import { getUserById } from "./get-user-by-id";
import { listUsers } from "./list-customers";
import { updateUser } from "./update-user";

export async function userRoutes(app: FastifyInstance) {
	app.get("", adminOnly(), listUsers);
	app.get("/:id", adminOnly(), getUserById);
	app.post("", adminOnly(), createUser);
	app.patch("/:id", adminOnly(), updateUser);
	app.delete("/:id", adminOnly(), deleteUser);
	app.get("/me", authOnly(), me);
	app.patch("/me", authOnly(), updateMe);
}
