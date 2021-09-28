import { http } from "./httpService";

const apiEndpoint = "/papers";

export function getPapers() {
	return http.get(apiEndpoint);
}

export function getPaper(id) {
	return http.get(apiEndpoint + `/papers/${id}`);
}
