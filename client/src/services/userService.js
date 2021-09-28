import { http } from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
	return http.post(apiEndpoint, {
		email: user.email,
		password: user.password,
		age: user.age || null,
		gender: user.gender === "N/A" ? null : user.gender,
	});
}
