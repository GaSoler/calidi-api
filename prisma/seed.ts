import {
	AppointmentStatus,
	CancelReason,
	PrismaClient,
	Weekday,
} from "@prisma/client";

const prisma = new PrismaClient();

function time(hour: number, minute: number = 0): Date {
	return new Date(Date.UTC(1970, 0, 1, hour, minute));
}

function createAppointmentDateTime(
	daysFromNow: number,
	hour: number,
	minute: number = 0,
): Date {
	const date = new Date();
	date.setDate(date.getDate() + daysFromNow);
	date.setHours(hour, minute, 0, 0);
	return date;
}

async function main() {
	// Limpeza
	await prisma.appointment.deleteMany({});
	await prisma.barberAvailability.deleteMany({});
	await prisma.userRole.deleteMany({});
	await prisma.otp.deleteMany({});
	await prisma.service.deleteMany({});
	await prisma.user.deleteMany({});
	await prisma.role.deleteMany({});

	// ========== ROLES ==========
	const roles = ["ADMIN", "BARBER", "CUSTOMER"];
	for (const roleName of roles) {
		await prisma.role.upsert({
			where: { name: roleName },
			update: {},
			create: { name: roleName },
		});
	}
	console.log("✅ Roles seeded");

	// ========== USUÁRIOS ==========
	const customer1 = await prisma.user.upsert({
		where: { phone: "11999111111" },
		update: {},
		create: {
			name: "João Silva",
			phone: "11999111111",
			email: "joao.silva@example.com",
		},
	});

	const customer2 = await prisma.user.upsert({
		where: { phone: "11999555555" },
		update: {},
		create: {
			name: "Pedro Santos",
			phone: "11999555555",
			email: "pedro.santos@example.com",
		},
	});

	const barber1 = await prisma.user.upsert({
		where: { phone: "11999222222" },
		update: {},
		create: {
			name: "Carlos Barbeiro",
			phone: "11999222222",
			email: "carlos.barber@example.com",
		},
	});

	const barber2 = await prisma.user.upsert({
		where: { phone: "11999666666" },
		update: {},
		create: {
			name: "Ricardo Navalha",
			phone: "11999666666",
			email: "ricardo.barber@example.com",
		},
	});

	const barberAdmin = await prisma.user.upsert({
		where: { phone: "11999333333" },
		update: {},
		create: {
			name: "Roberto Dono",
			phone: "11999333333",
			email: "roberto.admin@example.com",
		},
	});

	const admin = await prisma.user.upsert({
		where: { phone: "11999444444" },
		update: {},
		create: {
			name: "Ana Gerente",
			phone: "11999444444",
			email: "ana.admin@example.com",
		},
	});

	// ========== VINCULAR ROLES ==========
	const allRoles = await prisma.role.findMany();
	const roleMap = new Map(allRoles.map((r) => [r.name, r.id]));

	await prisma.userRole.createMany({
		data: [
			// Clientes
			{ userId: customer1.id, roleId: roleMap.get("CUSTOMER")! },
			{ userId: customer2.id, roleId: roleMap.get("CUSTOMER")! },

			// Barbeiros
			{ userId: barber1.id, roleId: roleMap.get("BARBER")! },
			{ userId: barber2.id, roleId: roleMap.get("BARBER")! },

			// Barbeiro Admin (ADMIN + BARBER)
			{ userId: barberAdmin.id, roleId: roleMap.get("ADMIN")! },
			{ userId: barberAdmin.id, roleId: roleMap.get("BARBER")! },

			// Admin puro
			{ userId: admin.id, roleId: roleMap.get("ADMIN")! },
		],
		skipDuplicates: true,
	});
	console.log("✅ Users and roles seeded");

	// ========== SERVIÇOS ==========
	const services = [
		{
			name: "Corte de Cabelo Masculino",
			description: "Clássico corte de cabelo com tesoura e máquina",
			duration: 30,
			price: 35.0,
			active: true,
		},
		{
			name: "Barba Completa",
			description: "Aparar, modelar e hidratar a barba com toalha quente",
			duration: 25,
			price: 25.0,
			active: true,
		},
		{
			name: "Corte + Barba",
			description: "Corte de cabelo e barba completa - combo promocional",
			duration: 50,
			price: 55.0, // desconto no combo
			active: true,
		},
		{
			name: "Sobrancelha",
			description: "Design de sobrancelha feito com navalha",
			duration: 15,
			price: 18.0,
			active: true,
		},
		{
			name: "Corte Infantil",
			description: "Corte para crianças até 12 anos",
			duration: 25,
			price: 30.0,
			active: true,
		},
		{
			name: "Hidratação Capilar",
			description: "Tratamento hidratante para cabelos ressecados",
			duration: 30,
			price: 40.0,
			active: true,
		},
		{
			name: "Pigmentação de Barba",
			description: "Realce da barba cobrindo falhas",
			duration: 40,
			price: 80.0,
			active: true,
		},
		{
			name: "Corte Social",
			description: "Corte executivo para ocasiões formais",
			duration: 35,
			price: 45.0,
			active: true,
		},
		{
			name: "Relaxamento Capilar",
			description: "Serviço descontinuado",
			duration: 60,
			price: 70.0,
			active: false,
		},
	];

	const createdServices = [];
	for (const service of services) {
		const created = await prisma.service.upsert({
			where: { name: service.name },
			update: {},
			create: service,
		});
		createdServices.push(created);
	}
	console.log("✅ Services seeded (including inactive ones)");

	// ========== DISPONIBILIDADE DOS BARBEIROS ==========
	const workDays = [
		Weekday.MONDAY,
		Weekday.TUESDAY,
		Weekday.WEDNESDAY,
		Weekday.THURSDAY,
		Weekday.FRIDAY,
	];

	// Barbeiro Admin - horário padrão
	for (const weekday of workDays) {
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
				startTime: time(8),
				endTime: time(18),
			},
		});
	}

	// Sábado meio período
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
			startTime: time(8),
			endTime: time(14),
		},
	});

	// Barbeiro 1 - horário alternativo
	for (const weekday of workDays) {
		await prisma.barberAvailability.upsert({
			where: {
				barberId_weekday: {
					barberId: barber1.id,
					weekday,
				},
			},
			update: {},
			create: {
				barberId: barber1.id,
				weekday,
				startTime: time(9),
				endTime: time(17),
			},
		});
	}

	// Barbeiro 2 - trabalha terça, quinta e sábado
	const barber2Days = [Weekday.TUESDAY, Weekday.THURSDAY, Weekday.SATURDAY];
	for (const weekday of barber2Days) {
		const endTime = weekday === Weekday.SATURDAY ? time(16) : time(19);

		await prisma.barberAvailability.upsert({
			where: {
				barberId_weekday: {
					barberId: barber2.id,
					weekday,
				},
			},
			update: {},
			create: {
				barberId: barber2.id,
				weekday,
				startTime: time(10),
				endTime: endTime,
			},
		});
	}

	console.log(
		"✅ Barber availability seeded (multiple barbers with different schedules)",
	);

	// ========== AGENDAMENTOS VARIADOS ==========
	const corteService = createdServices.find(
		(s) => s.name === "Corte de Cabelo Masculino",
	)!;
	const barbaService = createdServices.find(
		(s) => s.name === "Barba Completa",
	)!;
	const comboService = createdServices.find((s) => s.name === "Corte + Barba")!;

	await prisma.appointment.createMany({
		data: [
			// Agendamentos confirmados (futuros)
			{
				customerId: customer1.id,
				barberId: barberAdmin.id,
				serviceId: corteService.id,
				status: AppointmentStatus.CONFIRMED,
				appointmentDate: createAppointmentDateTime(1, 10, 0), // amanhã 10h
			},
			{
				customerId: customer2.id,
				barberId: barber1.id,
				serviceId: barbaService.id,
				status: AppointmentStatus.CONFIRMED,
				appointmentDate: createAppointmentDateTime(1, 14, 30), // amanhã 14:30
			},
			{
				customerId: customer1.id,
				barberId: barber2.id,
				serviceId: comboService.id,
				status: AppointmentStatus.CONFIRMED,
				appointmentDate: createAppointmentDateTime(3, 11, 0), // daqui 3 dias 11h
			},

			// Agendamentos finalizados (passados)
			{
				customerId: customer1.id,
				barberId: barberAdmin.id,
				serviceId: corteService.id,
				status: AppointmentStatus.DONE,
				appointmentDate: createAppointmentDateTime(-1, 15, 0), // ontem 15h
			},
			{
				customerId: customer2.id,
				barberId: barber1.id,
				serviceId: barbaService.id,
				status: AppointmentStatus.DONE,
				appointmentDate: createAppointmentDateTime(-3, 9, 30), // 3 dias atrás
			},

			// Agendamentos cancelados
			{
				customerId: customer1.id,
				barberId: barberAdmin.id,
				serviceId: corteService.id,
				status: AppointmentStatus.CANCELED,
				appointmentDate: createAppointmentDateTime(-2, 16, 0), // 2 dias atrás
				canceledReason: CancelReason.CUSTOMER_CANCELED,
			},
			{
				customerId: customer2.id,
				barberId: barber2.id,
				serviceId: comboService.id,
				status: AppointmentStatus.CANCELED,
				appointmentDate: createAppointmentDateTime(2, 13, 0), // daqui 2 dias
				canceledReason: CancelReason.WEATHER_OR_EMERGENCY,
			},
		],
	});
	console.log("✅ Appointments seeded (multiple statuses, times, and barbers)");

	// ========== RESUMO ==========
	const totalUsers = await prisma.user.count();
	const totalServices = await prisma.service.count();
	const totalAppointments = await prisma.appointment.count();

	console.log("\n🎯 SEED SUMMARY:");
	console.log(`👥 Users: ${totalUsers} (2 customers, 3 barbers, 1 admin)`);
	console.log(`💼 Services: ${totalServices} (1 inactive for testing)`);
	console.log(
		`📅 Appointments: ${totalAppointments} (confirmed, done, CANCELED)`,
	);
	console.log(`⏰ Multiple barbers with different schedules`);
	console.log(`📊 Ready for testing all scenarios!`);
}

main()
	.catch((e) => {
		console.error("❌ Seed error:", e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
