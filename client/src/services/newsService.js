import { http } from "./httpService";
const API_URL = "http://localhost:3001/api/news";

function singleNewsURL(id) {
	return `${API_URL}/${id}`;
}

export function getNews() {
	return http.get(API_URL);
}

export function getSingleNews(id) {
	return http.get(singleNewsURL(id));
}
