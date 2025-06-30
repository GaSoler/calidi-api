import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const roles = ["ADMIN", "BARBER", "CUSTOMER"];

	for (const roleName of roles) {
		await prisma.role.upsert({
			where: { name: roleName },
			update: {},
			create: { name: roleName },
		});
	}

	console.log("✅ Roles seeded com sucesso");
}

main()
	.catch((e) => {
		console.error("❌ Erro no seed:", e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
