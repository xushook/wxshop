<template>
	<view class="position-relative">
		<view class="oneadv-title mt-3 mb-1 ml-2" v-if="title">{{title}}</view>
		<view class="position-relative" v-if="cover" :class="bool?'oneadv2-img a':'oneadv-img'">
			<image :src="cover" mode="" class="title-image" @click="getShow" v-if="boolimg">
			</image>
			<view class="d-flex del-text" v-else>
				<view class="" @click="delAll">
					全部删除 |
				</view>
				<view class="" @click="completeAll">
					&nbsp;完成
				</view>
			</view>
		</view>
	</view>
	<slot></slot>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
		toRefs,
		onMounted
	} from 'vue'
	let boolimg = ref(true)
	defineProps(['title', 'cover', 'bool'])
	const emit = defineEmits(['setChange', 'completeIconAll', 'delIconAll'])
	const getShow = () => {
		boolimg.value = false
		emit('setChange')
	}
	const completeAll = () => {
		emit('completeIconAll')
		boolimg.value = true
	}
	const delAll = () => {
		const historyval = uni.getStorageSync('history_key');
		if (historyval) {
			emit('delIconAll')
		}
	}
</script>

<style lang="less" scoped>
	.oneadv-img {
		width: 750rpx;
		height: 350rpx;
		overflow: hidden;

		.title-image {
			position: absolute;
			top: 50%;
			left: 0;
			width: 100%;
			-webkit-transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			transform: translateY(-50%);
		}
	}

	.a {
		width: 34rpx;
		height: 50rpx;
		position: absolute;
		right: 20rpx;
		top: 0;
	}

	.oneadv2-img image {
		width: 34rpx;
		height: 40rpx;

	}

	.del-text {
		width: 200rpx;
		position: absolute;
		right: 0rpx;
		top: 4rpx;
		font-size: 28rpx;
	}
</style>