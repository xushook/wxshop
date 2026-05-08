<template>
	<view>
		<swiper style="height:400rpx" :indicator-dots="true" :autoplay="true" circular :interval="3000"
			:duration="1000">
			<swiper-item v-for="(swiper, s) in swipers" :key="s">
				<view class="swiper-item">
					<image :src="swiper.src" mode="heightFix"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup lang="ts">
	defineProps(['swipers'])
</script>

<style lang="less">

</style>