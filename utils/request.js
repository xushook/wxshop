import Request from 'luch-request' // 下载的插件
const http = new Request({
	baseURL: 'http://81.68.254.47/api',
	timeout: 6 * 1000
});

//请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	config.header = {
		...config.header,
	}
	/* 演示
	if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	   return Promise.reject(config)
	 }
	**/
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})

//响应拦截器
http.interceptors.response.use((response) => {
	/* 对响应成功做点什么 可使用async await 做异步操作*/
	//  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
	//    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
	// if (response.config.custom.verification) { // 演示自定义参数的作用
	//   return response.data
	// }
	console.log(response)
	return response.data
}, (response) => {
	/*  对响应错误做点什么 （statusCode !== 200）*/
	console.log(response)
	return Promise.reject(response)
})

function request(options) {
	if (options.method.toLowerCase() == 'get') {
		options.data = options.params
	}
	let config = {
		url: options.url,
		method: options.method || 'GET',
		data: options.data || {},
		dataType: options.dataType || 'json'
	}
	return http.request(config)
}
export default request;