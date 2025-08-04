export type User = {
	name: string;
	email: string;
	phone: string;
	roles: string[];
};

export type UserAccessToken = {
	id: string;
	roles: string[];
};
