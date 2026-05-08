<template>
	<view>
		<view class="oneadv-title mt-3 mb-1 ml-2" v-if="title">{{title}}</view>
		<view class="oneadv-img position-relative" v-if="cover">
			<image :src="cover" mode="" class="title-image"></image>
		</view>
	</view>
	<solt></solt>
</template>

<script setup lang="ts">
	defineProps(['title', 'cover'])
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
</style>