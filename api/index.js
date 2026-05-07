import request from "../utils/request";
export function getHome() {
	return request({
		url: '/index_category/data',
		method: 'GET',
		data: {}
	})
}