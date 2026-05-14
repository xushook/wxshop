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
export function getChoose({
	title,
	page,
	all,
	sale_count,
	min_price,
	price
}) {
	return request({
		url: `/goods/search`,
		method: 'POST',
		data: {
			title,
			page,
			all,
			sale_count,
			min_price,
			price
		}
	})
}
export function getCate() {
	return request({
		url: `/category/app_category`,
		method: 'GET',
	})
}