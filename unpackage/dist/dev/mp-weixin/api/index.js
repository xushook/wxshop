"use strict";
const utils_request = require("../utils/request.js");
function getHome() {
  return utils_request.request({
    url: "/index_category/data",
    method: "GET",
    data: {}
  });
}
exports.getHome = getHome;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/index.js.map
