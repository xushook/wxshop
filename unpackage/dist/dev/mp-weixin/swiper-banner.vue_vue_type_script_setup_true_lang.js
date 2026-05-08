"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "swiper-banner",
  props: ["swipers"],
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.swipers, (swiper, s, i0) => {
          return {
            a: swiper.src,
            b: s
          };
        })
      };
    };
  }
});
exports._sfc_main = _sfc_main;
//# sourceMappingURL=../.sourcemap/mp-weixin/swiper-banner.vue_vue_type_script_setup_true_lang.js.map
