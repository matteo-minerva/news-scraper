import { http } from "./httpService";

const apiEndpoint = "/news";

export function getNews() {
	return http.get(apiEndpoint);
}
