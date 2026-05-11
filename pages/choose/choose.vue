<template>
	<view>
		<view class="d-flex choose-title a-center">
			<view class="span-15 d-flex">
				<view class="span24-8 d-flex j-center a-center left-title" v-for="(item,index) in screen.list"
					:key="index" @click="changeIndex(index)">
					<view :class="screen.currentIndex == index?'main-text-color':''">
						{{item.name}}
					</view>
					<view class="icon-wrapper ">
						<view class="iconfont icon-sort-up-full line-h0" :class="item.status==1?'main-text-color':''">

						</view>
						<view class="iconfont icon-sort-down-full line-h0" :class="item.status==2?'main-text-color':''">

						</view>
					</view>
				</view>

			</view>
			<view class="span-5 text-center right-title">
				筛选
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
		toRefs,
		onMounted
	} from 'vue'
	let screen = ref({
		currentIndex: 0,
		list: [{
			id: 1,
			name: '综合',
			status: 1,
		},
		{
			id: 2,
			name: '销量',
			status: 0,
		},
		{
			id: 3,
			name: '价格',
			status: 0,
		}
		]
	})
	/****************************************** 
	 *
	 * currentIndex指的是整个choose页面顶部tap栏的索引，
	 * list里status指每个tap栏中上下箭头的索引（小索引）
	 * 默认是currentIndex=0指‘综合’，当点‘销量’时，新索引index为1，即对应‘销量’，
	 * 所以既要获得新值，也要将tap索引currentIndex更换为新索引
	 * 
	 ******************************************/
	const changeIndex = (index : number) => {
		let oldIndex = screen.value.currentIndex	//获取原来的索引（点击之前的索引）
		let oldItem = screen.value.list[oldIndex]	//获取旧索引对应的属性
		if (index == oldIndex) {	//如果点击的索引与旧索引相同
			oldItem.status = oldItem.status == 1 ? 2 : 1	//判断小索引是否为1，是则变成2，否则为1（以达到点击来回切换的效果）
		} else {
			let newItem = screen.value.list[index]	//获取新的索引对应的属性
			newItem.status = 1	//该属性的小索引变为1
			oldItem.status = 0	//旧属性的小索引变为0
			screen.value.currentIndex = index	//将整个screen的索引变为目前的新索引
		}
	}
</script>

<style lang="less" scoped>
	.choose-title {
		width: 100%;
		height: 88rpx;
	}

	.left-title,
	.right-title {
		height: 88rpx;
		line-height: 88rpx;
	}
</style>