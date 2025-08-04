import { generateOtp } from "@/lib/otp";
import { sendOtpViaWhatsapp } from "@/lib/whatsapp";
import type { OtpRepository } from "@/repositories/otp-repository";
import type { UserRepository } from "@/repositories/user-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";

export interface SendOtpUseCaseRequest {
	phone: string;
}

export class SendOtpUseCase {
	constructor(
		private userRepository: UserRepository,
		private otpRepository: OtpRepository,
	) {}

	async execute({ phone }: SendOtpUseCaseRequest): Promise<void> {
		const user = await this.userRepository.findByPhone(phone);
		if (!user) {
			throw new UserNotFoundError();
		}

		await this.otpRepository.invalidateAllByUserId(user.id);

		const code = generateOtp();
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5min

		await this.otpRepository.create({
			userId: user.id,
			code,
			expiresAt,
		});

		await sendOtpViaWhatsapp(user.phone, code);
	}
}
