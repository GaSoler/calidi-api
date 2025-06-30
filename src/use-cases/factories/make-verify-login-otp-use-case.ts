import { PrismaOtpRepository } from "@/repositories/prisma/prisma-otp-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { VerifyLoginOtpUseCase } from "../verify-login.otp";

export function makeVerifyLoginOtpUseCase() {
	const userRepository = new PrismaUserRepository();
	const otpRepository = new PrismaOtpRepository();

	const verifyLoginOtpUseCase = new VerifyLoginOtpUseCase(
		userRepository,
		otpRepository,
	);

	return verifyLoginOtpUseCase;
}
