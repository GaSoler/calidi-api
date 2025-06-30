import { PrismaOtpRepository } from "@/repositories/prisma/prisma-otp-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { SendLoginOtpUseCase } from "../send-login-otp";

export function makeSendLoginOtpUseCase() {
	const userRepository = new PrismaUserRepository();
	const otpRepository = new PrismaOtpRepository();

	const sendLoginOtpUseCase = new SendLoginOtpUseCase(
		userRepository,
		otpRepository,
	);

	return sendLoginOtpUseCase;
}
