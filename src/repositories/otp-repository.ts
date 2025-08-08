import type { Otp } from "@prisma/client";

export interface OtpRepository {
	create(data: { userId: string; code: string; expiresAt: Date }): Promise<Otp>;
	findValidOtp(userId: string, code: string): Promise<Otp | null>;
	markUsed(otpId: string): Promise<void>;
	deleteExpired(): Promise<number>;
	invalidateAllByUserId(userId: string): Promise<void>;
}
