import type { OTP } from "@prisma/client";

export interface OtpRepository {
	create(data: { userId: string; code: string; expiresAt: Date }): Promise<OTP>;
	findValidOtp(userId: string, code: string): Promise<OTP | null>;
	markUsed(otpId: string): Promise<void>;
	deleteExpired(): Promise<number>;
	invalidateAllByUserId(userId: string): Promise<void>;
}
