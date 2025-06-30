import { canTryOtp, recordInvalidOtp } from "@/lib/otp-attempts";
import type { OtpRepository } from "@/repositories/otp-repository";
import type {
	UserRepository,
	UserWithRoles,
} from "@/repositories/user-repository";
import { InvalidOtpError } from "./errors/invalid-otp-error";
import { NotFoundUserError } from "./errors/not-found-user-error";
import { TooManyAttemptsError } from "./errors/too-many-attempts-error";

interface VerifyLoginOtpUseCaseRequest {
	phone: string;
	code: string;
}

interface VerifyLoginOtpUseCaseResponse {
	user: UserWithRoles;
}

export class VerifyLoginOtpUseCase {
	constructor(
		private userRepository: UserRepository,
		private otpRepository: OtpRepository,
	) {}

	async execute({
		code,
		phone,
	}: VerifyLoginOtpUseCaseRequest): Promise<VerifyLoginOtpUseCaseResponse> {
		const user = await this.userRepository.findByPhoneWithRoles(phone);
		if (!user) {
			throw new NotFoundUserError();
		}

		if (!canTryOtp(user.id)) {
			throw new TooManyAttemptsError();
		}

		const otp = await this.otpRepository.findValidOtp(user.id, code);
		if (!otp) {
			recordInvalidOtp(user.id);
			throw new InvalidOtpError();
		}

		await this.otpRepository.markUsed(otp.id);

		return { user };
	}
}
