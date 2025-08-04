import { AppointmentStatus, PrismaClient, Weekday } from "@prisma/client";

const prisma = new PrismaClient();

function time(hour: number, minute: number = 0): Date {
	return new Date(Date.UTC(1970, 0, 1, hour, minute));
}

async function main() {
	await prisma.appointment.deleteMany({});
	await prisma.barberAvailability.deleteMany({});
	await prisma.userRole.deleteMany({});
	await prisma.otp.deleteMany({});
	await prisma.service.deleteMany({});
	await prisma.user.deleteMany({});
	await prisma.role.deleteMany({});

	// Roles
	const roles = ["ADMIN", "BARBER", "CUSTOMER"];
	for (const roleName of roles) {
		await prisma.role.upsert({
			where: { name: roleName },
			update: {},
			create: { name: roleName },
		});
	}
	console.log("✅ Roles seeded");

	// Usuários
	const customer = await prisma.user.upsert({
		where: { phone: "999111111" },
		update: {},
		create: {
			name: "Cliente Teste",
			phone: "999111111",
			email: "cliente@example.com",
		},
	});
	const barber = await prisma.user.upsert({
		where: { phone: "999222222" },
		update: {},
		create: {
			name: "Barber Teste",
			phone: "999222222",
			email: "barber@example.com",
		},
	});
	const barberAdmin = await prisma.user.upsert({
		where: { phone: "999333333" },
		update: {},
		create: {
			name: "Barbeiro Admin",
			phone: "999333333",
			email: "barber-admin@example.com",
		},
	});
	const admin = await prisma.user.upsert({
		where: { phone: "999444444" },
		update: {},
		create: {
			name: "Admin Teste",
			phone: "999444444",
			email: "admin@example.com",
		},
	});

	// Vincular roles
	const allRoles = await prisma.role.findMany();

	const roleMap = new Map(allRoles.map((r) => [r.name, r.id]));

	await prisma.userRole.createMany({
		data: [
			{ userId: customer.id, roleId: roleMap.get("CUSTOMER")! },
			{ userId: barber.id, roleId: roleMap.get("BARBER")! },
			{ userId: barberAdmin.id, roleId: roleMap.get("ADMIN")! },
			{ userId: barberAdmin.id, roleId: roleMap.get("BARBER")! },
			{ userId: admin.id, roleId: roleMap.get("ADMIN")! },
		],
		skipDuplicates: true,
	});
	console.log("✅ Users and roles seeded");

	// Serviços
	const services = [
		{
			name: "Corte de Cabelo Masculino",
			description: "Clássico corte de cabelo com tesoura e maquininha",
			duration: 30,
			price: 40,
		},
		{
			name: "Barba Completa",
			description: "Aparar, modelar e hidratar a barba com toalha quente",
			duration: 20,
			price: 25,
		},
		{
			name: "Corte + Barba",
			description: "Corte de cabelo e barba completa em uma única sessão",
			duration: 45,
			price: 60,
		},
		{
			name: "Sobrancelha na Navalha",
			description:
				"Design de sobrancelha feito com navalha para realce do olhar",
			duration: 10,
			price: 20,
		},
		{
			name: "Corte Infantil",
			description:
				"Corte para crianças até 12 anos, com paciência e cuidado extra",
			duration: 30,
			price: 50,
		},
		{
			name: "Hidratação Capilar",
			description:
				"Tratamento com produtos hidratantes para cabelos ressecados",
			duration: 25,
			price: 40,
		},
		{
			name: "Pigmentação de Barba",
			description:
				"Realce da barba com pigmento, cobrindo falhas e deixando uniforme",
			duration: 35,
			price: 60,
		},
		{
			name: "Corte Degradê",
			description: "Corte com transição suave nas laterais, muito estiloso",
			duration: 35,
			price: 70,
		},
	];

	for (const service of services) {
		await prisma.service.upsert({
			where: { name: service.name },
			update: {},
			create: service,
		});
	}
	console.log("✅ Services seeded");

	// Disponibilidade do barbeiro
	const weekdays = [
		Weekday.MONDAY,
		Weekday.TUESDAY,
		Weekday.WEDNESDAY,
		Weekday.THURSDAY,
		Weekday.FRIDAY,
	];

	for (const weekday of weekdays) {
		await prisma.barberAvailability.upsert({
			where: {
				barberId_weekday: {
					barberId: barberAdmin.id,
					weekday,
				},
			},
			update: {},
			create: {
				barberId: barberAdmin.id,
				weekday,
				startTime: time(9),
				endTime: time(18),
			},
		});
	}

	// Sábado com horário diferente
	await prisma.barberAvailability.upsert({
		where: {
			barberId_weekday: {
				barberId: barberAdmin.id,
				weekday: Weekday.SATURDAY,
			},
		},
		update: {},
		create: {
			barberId: barberAdmin.id,
			weekday: Weekday.SATURDAY,
			startTime: time(9),
			endTime: time(13),
		},
	});

	console.log("✅ Barber availability seeded");

	// Agendamentos
	const service = await prisma.service.findFirst({
		where: { name: "Corte de Cabelo Masculino" },
	});

	if (!service) {
		throw new Error("Serviço não encontrado.");
	}

	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);

	const afterTomorrow = new Date(today);
	afterTomorrow.setDate(today.getDate() + 2);

	await prisma.appointment.createMany({
		data: [
			{
				customerId: customer.id,
				barberId: barberAdmin.id,
				serviceId: service.id,
				status: AppointmentStatus.CONFIRMED,
				appointmentDate: tomorrow,
			},
			{
				customerId: customer.id,
				barberId: barberAdmin.id,
				serviceId: service.id,
				status: AppointmentStatus.DONE,
				appointmentDate: afterTomorrow,
			},
			{
				customerId: customer.id,
				barberId: barberAdmin.id,
				serviceId: service.id,
				status: AppointmentStatus.CANCELLED,
				appointmentDate: afterTomorrow,
			},
		],
	});
	console.log("✅ Appointments seeded");
}

main()
	.catch((e) => {
		console.error("❌ Seed error:", e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
