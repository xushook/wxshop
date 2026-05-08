"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_search_solt2 = common_vendor.resolveComponent("search-solt");
  const _easycom_swiper_banner2 = common_vendor.resolveComponent("swiper-banner");
  (_easycom_search_solt2 + _easycom_swiper_banner2)();
}
const _easycom_search_solt = () => "../../components/search-solt/search-solt2.js";
const _easycom_swiper_banner = () => "../../components/swiper-banner/swiper-banner2.js";
if (!Math) {
  (_easycom_search_solt + _easycom_swiper_banner)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let currentIndex = common_vendor.ref(0);
    let scrollinto = common_vendor.ref("");
    let navbars = common_vendor.ref([]);
    let newsItems = common_vendor.ref([]);
    let scrollH = common_vendor.ref(0);
    var QQMapWX = require("../../static/qqmap-wx-jssdk.min.js");
    let qqmapsdk = "";
    let address = common_vendor.ref("");
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    const gethome = () => {
      api_index.getHome().then((res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:95", "res=>", res);
        navbars.value = res.data.category;
        for (var i = 0; i < navbars.value.length; i++) {
          let obj = {
            list: []
          };
          if (i == 0) {
            obj.list = res.data.data;
          }
          newsItems.value.push(obj);
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
    common_vendor.onLoad(() => {
      qqmapsdk = new QQMapWX({
        key: "56MBZ-SXH67-XMKXN-HJSGK-XQMHZ-FCBWA"
        //腾讯定位的key值
      });
    });
    common_vendor.onMounted(() => {
      gethome();
      common_vendor.index.getSystemInfo({
        success: (res) => {
          scrollH.value = res.windowHeight - common_vendor.index.upx2px(176);
        }
      });
      common_vendor.index.getLocation({
        type: "gcj02",
        success: function(res) {
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: (res2) => {
              address.value = res2.result.address;
            },
            fail: (error) => common_vendor.index.__f__("log", "at pages/index/index.vue:155", "error", error)
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/index/index.vue:159", "err", err);
        }
      });
    });
    common_vendor.onNavigationBarButtonTap((e) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:165", "e=>", e);
      if (e.index == 0) {
        common_vendor.index.__f__("log", "at pages/index/index.vue:167", "获取信息");
      } else {
        common_vendor.index.__f__("log", "at pages/index/index.vue:169", "扫码");
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
        b: common_vendor.t(common_vendor.unref(address)),
        c: common_vendor.f(common_vendor.unref(navbars), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: i,
            c: common_vendor.n(common_vendor.unref(currentIndex) == i ? "active" : ""),
            d: common_vendor.o(($event) => changeTabs(i), i),
            e: "tab" + i
          };
        }),
        d: common_vendor.unref(scrollinto),
        e: common_vendor.f(common_vendor.unref(newsItems), (news, index, i0) => {
          return common_vendor.e({
            a: news.list.length > 0
          }, news.list.length > 0 ? {
            b: common_vendor.f(news.list, (item, n, i1) => {
              return common_vendor.e({
                a: item.type == "swiper"
              }, item.type == "swiper" ? {
                b: "681e833c-1-" + i0 + "-" + i1,
                c: common_vendor.p({
                  swipers: item.data
                }),
                d: common_vendor.s("height:" + common_vendor.unref(scrollH) + "px")
              } : {}, {
                e: n
              });
            }),
            c: common_vendor.s("height:" + common_vendor.unref(scrollH) + "px")
          } : {}, {
            d: index
          });
        }),
        f: common_vendor.s("height:" + common_vendor.unref(scrollH) + "px"),
        g: common_vendor.unref(currentIndex),
        h: common_vendor.o(changeIndex)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
