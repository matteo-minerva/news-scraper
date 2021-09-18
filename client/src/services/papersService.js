import { http } from "./httpService";
const API_URL = "http://localhost:3001/api/papers/";

export function getPapers() {
	return http.get(API_URL);
}

export function getPaper(id) {
	return http.get(API_URL + id);
}
