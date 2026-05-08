import request from "../utils/request";
export function getHome() {
	return request({
		url: '/index_category/data',
		method: 'GET',
		data: {}
	})
}
export function getPage(id, page) {
	return request({
		url: `/index_category/${id}/data/${page}`,
		method: 'GET',
	})
}