"use strict";
const common_vendor = require("../common/vendor.js");
const http = new common_vendor.Request({
  baseURL: "http://81.68.254.47/api",
  timeout: 6 * 1e3
});
http.interceptors.request.use((config) => {
  config.header = {
    ...config.header
  };
  return config;
}, (config) => {
  return Promise.reject(config);
});
http.interceptors.response.use((response) => {
  common_vendor.index.__f__("log", "at utils/request.js:30", response);
  return response.data;
}, (response) => {
  common_vendor.index.__f__("log", "at utils/request.js:34", response);
  return Promise.reject(response);
});
function request(options) {
  if (options.method.toLowerCase() == "get") {
    options.data = options.params;
  }
  let config = {
    url: options.url,
    method: options.method || "GET",
    data: options.data || {},
    dataType: options.dataType || "json"
  };
  return http.request(config);
}
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
