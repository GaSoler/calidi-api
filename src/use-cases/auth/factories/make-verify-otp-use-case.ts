import { PrismaOtpRepository } from "@/repositories/prisma/prisma-otp-repository";
import { PrismaRoleRepository } from "@/repositories/prisma/prisma-role-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { VerifyOtpUseCase } from "../verify-otp";

export function makeVerifyOtpUseCase() {
	const userRepository = new PrismaUserRepository();
	const roleRepository = new PrismaRoleRepository();
	const otpRepository = new PrismaOtpRepository();

	const verifyOtpUseCase = new VerifyOtpUseCase(
		userRepository,
		roleRepository,
		otpRepository,
	);

	return verifyOtpUseCase;
}
