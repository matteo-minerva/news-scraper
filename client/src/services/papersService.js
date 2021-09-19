import { http } from "./httpService";
import { apiURL } from "../config.json";

export function getPapers() {
	return http.get(apiURL + "/papers");
}

export function getPaper(id) {
	return http.get(apiURL + `/papers/${id}`);
}
