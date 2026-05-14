<template>
	<view>
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
		<view class="d-flex">
			<scroll-view scroll-y="true" class="span-5" :style="'height:'+scrollH+'px'"
				:scroll-into-view="scrollIntoLeft" scroll-with-animation @scroll="scrollLeft">
				<view class="scroll-left">
					<view class="scroll-item-left text-center d-flex flex-column j-center" v-for="(item,index) in list"
						:key="index" :class="currentIndex == index? 'action':''" @click="changeIndex(index)"
						:id="'tabLeft'+index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="span-15" :style="'height:'+scrollH+'px'"
				:scroll-into-view="scrollIntoRight" scroll-with-animation @scroll="scrollRight">
				<view class="scroll-right">
					<view class="scroll-item-right d-flex flex-wrap text-center pb-5 cate-item" v-for="(item,i) in list"
						:key="i" :id="'tabRight'+i">
						<view class="span24-8" v-for="(content, j) in item.app_category_items" :key="j">
							<image :src="content.cover" mode=""></image>
							<view class="">
								{{content.name}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, onMounted, getCurrentInstance } from 'vue';
	import {
		getCate
	} from '../../api'

	let scrollH = ref(0);
	let list = ref([]);
	let currentIndex = ref(0)
	let scrollIntoLeft = ref('')
	let scrollIntoRight = ref('')
	let scrollTop = ref('');
	const instance = getCurrentInstance()
	const query = uni.createSelectorQuery().in(instance.proxy);
	let top = 0
	let scrollHeight = []

	onMounted(() => {
		getcate()
		//获取系统信息
		uni.getSystemInfo({
			success: (res) => {
				scrollH.value = (res.windowHeight - uni.upx2px(88))
				// console.log('qqqq', uni.upx2px(88));
			}
		})
		setTimeout(() => {
			init()
		}, 1000)
	})
	const init = () => {
		query.selectAll(".cate-item").boundingClientRect((data) => {
			console.log("得到布局位置信息" + JSON.stringify(data));
			scrollHeight = data.map(item => {
				top += item.height;
				return top;
			})
			// [1, 2, 3, 4, 5, 6]
			// [1, 1 + 2, 1 + 2 + 3, 1 + 2 + 3 + 4, 1 + 2 + 3 + 4 + 5, 1 + 2 + 3 + 4 + 5 + 6]
		})
			.exec();
	}
	const getcate = () => {
		getCate().then(res => {
			console.log('res', res);
			list.value = res.data
		})
	}
	const changeIndex = (index : number) => {
		currentIndex.value = index
		scrollIntoRight.value = 'tabRight' + index
	}
	const scrollRight = (e) => {
		scrollTop.value = e.datail.scrollTop
		let index = scrollHeight.findIndex(v => {
			return v >= scrollTop.value + 0.1
		})
		// console.log('index', index);
		// console.log('scrollIntoRight.value',scrollIntoRight.value);
		scrollIntoLeft = 'tabLeft' + index
		scrollIntoRight.value = ''
		currentIndex.value = index
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

	.scroll-left .scroll-item-left {
		width: 100%;
		height: 120rpx;
	}

	.cate-item image {
		width: 88rpx;
		height: 100rpx;
	}

	.scroll-right .scroll-item-right:last-child {
		padding-bottom: 80vh;
	}
</style>