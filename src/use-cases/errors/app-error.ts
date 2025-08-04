export class AppError extends Error {
	constructor(
		public message: string,
		public code: string,
		public status: number = 400,
		public details: unknown = null,
	) {
		super(message);
		this.name = this.constructor.name;
	}
}
