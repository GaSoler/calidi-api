import { generateOtp } from "@/lib/otp";
import { sendOtpViaWhatsapp } from "@/lib/whatsapp";
import type { OtpRepository } from "@/repositories/otp-repository";
import type { UserRepository } from "@/repositories/user-repository";
import { NotFoundUserError } from "./errors/not-found-user-error";

export interface SendLoginOtpUseCaseRequest {
	phone: string;
}

export class SendLoginOtpUseCase {
	constructor(
		private userRepository: UserRepository,
		private otpRepository: OtpRepository,
	) {}

	async execute({ phone }: SendLoginOtpUseCaseRequest): Promise<void> {
		const user = await this.userRepository.findByPhone(phone);
		if (!user) {
			throw new NotFoundUserError();
		}

		await this.otpRepository.invalidateAllByUserId(user.id);

		const code = generateOtp();
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

		await this.otpRepository.create({
			userId: user.id,
			code,
			expiresAt,
		});

		await sendOtpViaWhatsapp(user.phone, code);
	}
}
