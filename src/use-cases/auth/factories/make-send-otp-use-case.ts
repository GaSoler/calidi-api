import { PrismaOtpRepository } from "@/repositories/prisma/prisma-otp-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { SendOtpUseCase } from "../send-otp";

export function makeSendOtpUseCase() {
	const userRepository = new PrismaUserRepository();
	const otpRepository = new PrismaOtpRepository();

	const sendOtpUseCase = new SendOtpUseCase(userRepository, otpRepository);

	return sendOtpUseCase;
}
