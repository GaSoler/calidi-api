import type { OTP } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { OtpRepository } from "../otp-repository";

export class PrismaOtpRepository implements OtpRepository {
	async create(data: {
		userId: string;
		code: string;
		expiresAt: Date;
	}): Promise<OTP> {
		const otp = await prisma.oTP.create({
			data,
		});

		return otp;
	}

	async findValidOtp(userId: string, code: string): Promise<OTP | null> {
		const otp = await prisma.oTP.findFirst({
			where: {
				userId,
				code,
				used: false,
				expiresAt: { gt: new Date() },
			},
		});

		return otp;
	}

	async markUsed(otpId: string): Promise<void> {
		await prisma.oTP.update({
			where: { id: otpId },
			data: { used: true },
		});
	}

	async deleteExpired(): Promise<number> {
		const res = await prisma.oTP.deleteMany({
			where: {
				used: false,
				expiresAt: { lt: new Date() },
			},
		});

		return res.count;
	}

	async invalidateAllByUserId(userId: string): Promise<void> {
		await prisma.oTP.updateMany({
			where: {
				userId,
				used: false,
				expiresAt: { gt: new Date() },
			},
			data: { used: true },
		});
	}
}
