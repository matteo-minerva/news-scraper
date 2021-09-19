import { http } from "./httpService";
import { apiURL } from "../config.json";

export function getNews() {
	return http.get(apiURL + "/news");
}
