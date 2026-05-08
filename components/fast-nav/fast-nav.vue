<template>
	<view>
		<swiper style="height: 400rpx">
			<swiper-item v-for="(indexnav,p) in pagges" :key="p">
				<view class="swiper-item d-flex flex-wrap">
					<view class="span-5 text-center" v-for="(item, k) in indexnav" :key="k">
						<image :src="item.src" mode="" class="fastnav-img my-2"></image>
						<view class="">{{item.text}}</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup lang="ts">
	defineProps(['pagges'])
</script>

<style lang="less" scoped>
	.fastnav-img {
		width: 88rpx;
		height: 88rpx;
	}
</style>