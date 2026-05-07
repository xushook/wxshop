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
				<view class="right-bar text-center">
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
		<scroll-view scroll-x="true" :scroll-into-view="scrollinto" scroll-with-animation>
			<view class="d-flex flex-nowrap tabs-title">
				<view class="flex-shrink mx-2" v-for="(item,i) in navbars" :key="i" :class="currentIndex==i?'active':''"
					@click="changeTabs(i)" :id="'tab'+i">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<swiper :style="'height:'+scrollH+'px'" :current="currentIndex" @change="changeIndex">
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		onNavigationBarButtonTap,
		onNavigationBarSearchInputClicked
	} from '@dcloudio/uni-app'
	// let title = ref('Hello')
	import {
		getHome
	} from '../../api/index.js'
	let currentIndex = ref(0)
	let scrollinto = ref('')
	let navbars = ref([])
	let newsItems = ref([])
	let scrollH = ref(0)
	const goSearch = () => {
		uni.navigateTo({
			url: '/pages/search/search'
		})
	}
	const gethome = () => {
		getHome().then(res => {
			console.log('res=>', res);
			navbars.value = res.data.category
			for (var i = 0; i < navbars.value.length; i++) {
				let obj = {
					list: []
				}
				if (i == 0) {
					obj.list = res.data.data
				}
				newsItems.value.push(obj)
				console.log('newsItems.value:', newsItems.value);
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
	onMounted(() => {
		gethome()
		//获取系统信息
		uni.getSystemInfo({
			success: (res) => {
				scrollH.value = (res.windowHeight - uni.upx2px(176))
				// console.log('uni.upx2px(176):', uni.upx2px(176));
			}
		})
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
</style>