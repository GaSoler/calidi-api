import { PrismaOtpRepository } from "@/repositories/prisma/prisma-otp-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { VerifyOtpUseCase } from "../verify-otp";

export function makeVerifyOtpUseCase() {
	const userRepository = new PrismaUserRepository();
	const otpRepository = new PrismaOtpRepository();

	const verifyOtpUseCase = new VerifyOtpUseCase(userRepository, otpRepository);

	return verifyOtpUseCase;
}
