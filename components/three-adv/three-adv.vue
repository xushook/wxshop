<template>
	<view class="d-flex mt-2">
		<view class="left-adv span-10">
			<image :src="news[0].src" mode="widthFix" class="span-20"></image>
		</view>
		<view class="right-adv span-10">
			<image :src="news[1].src" class="span-20"></image>
			<image :src="news[2].src" class="span-20"></image>
		</view>
	</view>
</template>

<script setup lang="ts">
	defineProps(['news'])
</script>

<style lang="less" scoped>
	.left-adv image {
		height: 480rpx;
	}

	.right-adv image {
		height: 260rpx;
	}
</style>