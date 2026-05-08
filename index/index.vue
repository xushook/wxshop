<template>
	<!-- view === div   image === img  text === span -->
	<view class="home">
		<!-- #ifdef MP-WEIXIN || H5-->
		<search-solt>
			<template #leftbar>
				<view class="left-bar text-center">
					<view class="iconfont icon-xiaoxi"></view>
				</view>
			</template>
			<template #centerbar>
				<view class="center-bar flex-1" @click="goSearch">
					请输入搜索内容
				</view>
			</template>
			<template #rightbar>
				<!-- #ifdef MP -->
				<view class="right-bar text-center" @click="getCode">
					<view class="iconfont icon-saoma"></view>
				</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<!-- <view class="right-bar text-center">
					<view class="h-login">登录</view>
				</view> -->
				<!-- #endif -->
			</template>
		</search-solt>
		<!-- #endif -->
		<view class="a-address">
			{{address}}
		</view>
		<scroll-view scroll-x="true" :scroll-into-view="scrollinto" scroll-with-animation>
			<view class="d-flex flex-nowrap tabs-title">
				<view class="flex-shrink mx-2" v-for="(item,i) in navbars" :key="i" :class="currentIndex==i?'active':''"
					@click="changeTabs(i)" :id="'tab'+i">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<swiper :style="'height:'+scrollH+'px'" :current="currentIndex" @change="changeIndex">
			<swiper-item v-for="(news, index) in newsItems" :key="index">
				<template v-if="news.list.length>0">
					<view class="swiper-item">
						<scroll-view scroll-y="true" :style="'height:'+scrollH+'px'">
							<block v-for="(item, n) in news.list" :key="n">
								<template v-if="item.type == 'swiper'">
									<scroll-view scroll-y="true" :style="'height:' +scrollH+'px'">
										<swiper-banner :swipers="item.data"></swiper-banner>
									</scroll-view>
								</template>
								<template v-if="item.type=='indexnavs'">
									<fast-nav :pagges="pagges"></fast-nav>
								</template>
							</block>
						</scroll-view>
					</view>
				</template>
				<template v-else>
					<view>没有内容</view>
				</template>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref
	} from 'vue';
	import {
		onLoad,
		onNavigationBarButtonTap,
		onNavigationBarSearchInputClicked
	} from '@dcloudio/uni-app'
	import {
		getHome
	} from '../../api/index.js'

	let currentIndex = ref(0) //
	let scrollinto = ref('')
	let navbars = ref([]) //navbars是顶部导航
	let newsItems = ref([]) //newsItems是每个导航内部的每个数据
	let scrollH = ref(0)
	//定位相关配置
	var QQMapWX = require('../../static/qqmap-wx-jssdk.min.js')
	let qqmapsdk = ''
	let address = ref('')

	const goSearch = () => {
		uni.navigateTo({
			url: '/pages/search/search'
		})
	}
	const gethome = () => {
		getHome().then(res => {
			console.log('res=>', res);
			navbars.value = res.data.category //navbars是顶部导航
			for (var i = 0; i < navbars.value.length; i++) {
				let obj = {
					list: []
				}
				if (i == 0) {
					obj.list = res.data.data
				}
				newsItems.value.push(obj) //newsItems是每个导航内部的每个数据
				// console.log('newsItems.value:', newsItems.value);
			}
		})
	}
	const changeTabs = (index) => {
		currentIndex.value = index
		scrollinto.value = 'tab' + index
		if (currentIndex.value < 5) {
			scrollinto.value = 'tab0'
		} else {
			scrollinto.value = 'tab' + (index - 5)
		}
	}
	const changeIndex = (e) => {
		currentIndex.value = e.detail.current
		if (currentIndex.value < 5) {
			scrollinto.value = 'tab0'
		} else {
			scrollinto.value = 'tab' + (e.detail.current - 5)
		}
	}
	//金刚区- 快速导航的计算属性
	const pagges = computed(() => {
		let pagge = []
		let index = currentIndex.value
		if (newsItems.value[index].list) {
			console.log('newsItems.value[index].list', newsItems.value[index].list);
			let obj = newsItems.value[index].list
			obj.forEach(v => {
				if (v.type == 'indexnavs') {
					let indexnav = Object.values(v.data)
					console.log('indexnav', indexnav);
					indexnav.forEach((item, index) => {
						let page = Math.floor(index / 8)
						if (!pagge[page]) {
							pagge[page] = []
						}
						pagge[page].push(item)
					})
				}
			})
		}
		console.log('pagge', pagge);
		return pagge
	})
	onLoad(() => {
		qqmapsdk = new QQMapWX({
			key: '56MBZ-SXH67-XMKXN-HJSGK-XQMHZ-FCBWA' //腾讯定位的key值
		});
	})
	onMounted(() => {
		gethome()
		//获取系统信息 - 手机的竖向剩余长度
		uni.getSystemInfo({
			success: (res) => {
				scrollH.value = (res.windowHeight - uni.upx2px(176))
				// console.log('uni.upx2px(176):', uni.upx2px(176));
			}
		})
		//定位
		uni.getLocation({
			type: 'gcj02',
			success: function(res) {
				// console.log('当前位置的经度：' + res.longitude);
				// console.log('当前位置的纬度：' + res.latitude);
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: res.latitude,
						longitude: res.longitude
					},
					success: res2 => {
						// console.log('res2', res2)
						address.value = res2.result.address
					},
					fail: error => console.log('error', error)
				})
			},
			fail: (err) => {
				console.log('err', err);
			}
		});
	})

	onNavigationBarButtonTap((e) => {
		console.log('e=>', e);
		if (e.index == 0) {
			console.log('获取信息')
		} else {
			console.log('扫码')
		}
	})
	onNavigationBarSearchInputClicked(() => {
		uni.navigateTo({
			url: '/pages/search/search'
		})
	})
	//手机扫码
	const getCode = () => {
		uni.scanCode({
			success: function(res) {
				console.log('条码类型:' + res.scanType)
				console.log('条码内容:' + res.result)
			}
		})
	}
</script>

<style lang="less">
	.left-bar,
	.right-bar {
		width: 44rpx;
		height: 44rpx;
		line-height: 44rpx;
	}

	.center-bar {
		height: 60rpx;
		line-height: 60rpx;
		background-color: #f4f4f4;
		color: #ccc;
		text-indent: 20rpx;
	}

	.h-login {
		font-size: 20rpx;
		white-space: nowrap;
	}

	.tabs-title {
		width: 100%;
		height: 88rpx;
		line-height: 98rpx;
	}

	// .swiper-img {
	// 	width: 100%;
	// 	display: block;
	// }
	.a-address {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		// background-color: rgba(255, 0, 0, 0.1);
	}
</style>