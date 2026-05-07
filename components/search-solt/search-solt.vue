<template>
	<view>
		<view class="nav-bar d-flex a-center px">
			<slot name="leftbar"></slot>
			<slot name="centerbar"></slot>
			<slot name="rightbar"></slot>
		</view>
	</view>
</template>

<script setup lang="ts">

</script>

<style lang="less">
	.nav-bar {
		width: 100%;
		height: 88rpx;
		box-sizing: border-box;
	}
</style>