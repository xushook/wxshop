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
						<scroll-view scroll-y="true" :style="'height:'+scrollH+'px'"
							@scrolltolower="scrollToLower(index)">
							<block v-for="(item, n) in news.list" :key="n">
								<template v-if="item.type == 'swiper'">
									<swiper-banner :swipers="item.data"></swiper-banner>
								</template>
								<template v-if="item.type=='indexnavs'">
									<fast-nav :pagges="pagges"></fast-nav>
								</template>
								<template v-else-if="item.type=='threeAdv'">
									<three-adv :news="item.data"></three-adv>
								</template>
								<template v-else-if="item.type=='oneAdv'">
									<one-adv :title="item.data.title" :cover="item.data.cover"></one-adv>
								</template>
								<template v-else-if="item.type=='list'">
									<common-list :news="item.data"></common-list>
								</template>
							</block>
							<view class="l-loadmore text-center my-3">
								{{news.loadmore}}
							</view>
						</scroll-view>
					</view>
				</template>
				<template v-else-if="news.forward == 'before'">
					<view class="text-center text-muted my-2">
						<image src="/static/loading.gif" mode="" style="width: 80rpx;height: 80rpx;"></image>
					</view>
				</template>
				<template v-else>
					<view class="text-center text-muted my-2">暂无数据</view>
				</template>
			</swiper-item>
		</swiper>
		<sk-index v-if="isShow"></sk-index>
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
		getHome,
		getPage
	} from '../../api/index.js'

	let currentIndex = ref(0) //顶部导航的索引
	let scrollinto = ref('')
	let navbars = ref([]) //navbars是顶部导航
	let newsItems = ref([]) //newsItems是每个导航内部的每个数据
	let scrollH = ref(0)
	//定位相关配置
	var QQMapWX = require('../../static/qqmap-wx-jssdk.min.js')
	let qqmapsdk = ''
	let address = ref('')
	//骨架屏
	let isShow = ref(true);

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
				//给每个顶部Tab栏的内容打上forward标识
				/******************************************* 
				 *
				 * 打上 forward 标识是为了 ： 防止在切换到 其它Tab栏 再切回来后，
				 * 导致该页面触发 getpage 而触发 “下拉加载” 效果
				 * 
				 *******************************************/
				let forward = i == 0 ? 'after' : 'before' //如果是第一个Tab栏，则赋值after，其余赋值before
				let obj = {
					list: [],
					loadmore: '加载更多...',
					forward: forward //真正打上标识，上面做铺垫
				}
				if (i == 0) {
					obj.list = res.data.data
				}
				newsItems.value.push(obj) //newsItems是每个导航内部的每个数据
				// console.log('newsItems.value:', newsItems.value);
			}
			isShow.value = false
		})
	}
	const getpage = (callback) => {
		let id = navbars.value[currentIndex.value].id
		let obj = newsItems.value[currentIndex.value]
		let page = Math.ceil(obj.list.length / 5) + 1
		obj.forward = 'before' //给每个页面加上forword标识，如果这个页面加载过，变为after
		getPage(id, page).then(res => {
			console.log('respage', res);
			let data = res.data
			obj.list = [...obj.list, ...data]
			// console.log('respage=>newsItems.value', newsItems.value);
			obj.loadmore = data.length < 5 ? '没有更多了...' : '加载更多...'
			obj.forward = 'after' //此时加载了getPage函数，将标识取反（变为after标识）
		})
		if (typeof callback == 'function') {
			callback()
		}
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
		//切换顶部Tab栏导航后内部加载
		let obj = newsItems.value[currentIndex.value]
		if (obj.forward == 'before') {
			getpage()
		} else {
			return
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
				scrollH.value = (res.windowHeight - uni.upx2px(264))
				// console.log('uni.upx2px(264):', uni.upx2px(264));
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
	//滚动到底部监听
	const scrollToLower = (index) => {
		let obj = newsItems.value[index]
		// console.log('触底了');
		obj.loadmore = '加载中...'
		if (obj.loadmore != '加载中...') {
			return
		} else {
			setTimeout(() => {
				getpage(() => {
					uni.showToast({
						title: '加载成功'
					})
				})
			}, 2000)
		}

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