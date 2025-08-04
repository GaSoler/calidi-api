import { canTryOtp, recordInvalidOtp } from "@/lib/otp-attempts";
import type { OtpRepository } from "@/repositories/otp-repository";
import type { RoleRepository } from "@/repositories/role-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { UserAccessToken } from "@/types/user";
import { InvalidOtpError } from "../errors/invalid-otp-error";
import { TooManyAttemptsError } from "../errors/too-many-attempts-error";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface VerifyOtpUseCaseRequest {
	phone: string;
	code: string;
}

interface VerifyOtpUseCaseResponse {
	user: UserAccessToken;
}

export class VerifyOtpUseCase {
	constructor(
		private userRepository: UserRepository,
		private roleRepository: RoleRepository,
		private otpRepository: OtpRepository,
	) {}

	async execute({
		phone,
		code,
	}: VerifyOtpUseCaseRequest): Promise<VerifyOtpUseCaseResponse> {
		const user = await this.userRepository.findByPhone(phone);
		if (!user) {
			throw new UserNotFoundError();
		}

		const roles = await this.roleRepository.findByUserId(user.id);

		if (!canTryOtp(user.id)) {
			throw new TooManyAttemptsError();
		}

		const otp = await this.otpRepository.findValidOtp(user.id, code);
		if (!otp) {
			recordInvalidOtp(user.id);
			throw new InvalidOtpError();
		}

		await this.otpRepository.markUsed(otp.id);

		return {
			user: {
				id: user.id,
				roles: roles.map((role) => role.name),
			},
		};
	}
}
