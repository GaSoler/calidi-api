import "@fastify/jwt";

declare module "@fastify/jwt" {
	export interface FastifyJWT {
		user: {
			roles: string[];
			sub: string;
		};
	}
}
