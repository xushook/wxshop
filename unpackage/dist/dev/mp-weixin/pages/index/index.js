"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_search_solt2 = common_vendor.resolveComponent("search-solt");
  _easycom_search_solt2();
}
const _easycom_search_solt = () => "../../components/search-solt/search-solt2.js";
if (!Math) {
  _easycom_search_solt();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let currentIndex = common_vendor.ref(0);
    let scrollinto = common_vendor.ref("");
    let navbars = common_vendor.ref([]);
    let newsItems = common_vendor.ref([]);
    let scrollH = common_vendor.ref(0);
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    const gethome = () => {
      api_index.getHome().then((res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:71", "res=>", res);
        navbars.value = res.data.category;
        for (var i = 0; i < navbars.value.length; i++) {
          let obj = {
            list: []
          };
          if (i == 0) {
            obj.list = res.data.data;
          }
          newsItems.value.push(obj);
          common_vendor.index.__f__("log", "at pages/index/index.vue:81", "newsItems.value:", newsItems.value);
        }
      });
    };
    const changeTabs = (index) => {
      currentIndex.value = index;
      scrollinto.value = "tab" + index;
      if (currentIndex.value < 5) {
        scrollinto.value = "tab0";
      } else {
        scrollinto.value = "tab" + (index - 5);
      }
    };
    const changeIndex = (e) => {
      currentIndex.value = e.detail.current;
      if (currentIndex.value < 5) {
        scrollinto.value = "tab0";
      } else {
        scrollinto.value = "tab" + (e.detail.current - 5);
      }
    };
    common_vendor.onMounted(() => {
      gethome();
      common_vendor.index.getSystemInfo({
        success: (res) => {
          scrollH.value = res.windowHeight - common_vendor.index.upx2px(176);
        }
      });
    });
    common_vendor.onNavigationBarButtonTap((e) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:114", "e=>", e);
      if (e.index == 0) {
        common_vendor.index.__f__("log", "at pages/index/index.vue:116", "获取信息");
      } else {
        common_vendor.index.__f__("log", "at pages/index/index.vue:118", "扫码");
      }
    });
    common_vendor.onNavigationBarSearchInputClicked(() => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goSearch),
        b: common_vendor.f(common_vendor.unref(navbars), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: i,
            c: common_vendor.n(common_vendor.unref(currentIndex) == i ? "active" : ""),
            d: common_vendor.o(($event) => changeTabs(i), i),
            e: "tab" + i
          };
        }),
        c: common_vendor.unref(scrollinto),
        d: common_vendor.s("height:" + common_vendor.unref(scrollH) + "px"),
        e: common_vendor.unref(currentIndex),
        f: common_vendor.o(changeIndex)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
