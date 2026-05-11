<template>
	<view class="skeleton-view">
		<view class="skeleton-global skeleton-top"></view>
		<view class="skeleton-global skeleton-top"></view>
		<view class="skeleton-global skeleton-top"></view>
		<view class="skeleton-global skeleton-img"></view>
		<view class="fast-nav">
			<view v-for="(item,index) in YIMIAO" :key="index">
			   <view class="skeleton-global"></view>
			</view>
		</view>
		<view class="vaccine phy">
			<text class="skeleton-global" v-for="(item,i) in YIMIAO.slice(0,2)" :key="i"></text>
		</view>
		<view class="vaccine regist">
			<text class="skeleton-global" v-for="(item,k) in GUAHAO" :key="k"></text>
		</view>
	</view>
</template>

<script>
	// 取出胶囊按钮数据
	export default {
		data() {
			return {
				YIMIAO: ['', '', '', '','', '', '', ''],
				GUAHAO: ['', '', '', '', '', '', '', '', '']
			}
		}
	}
</script>

<style scoped>
	.skeleton-top {
		margin:0 20rpx;
		height: 88rpx;
		margin-top: 20rpx;
	}

	.skeleton-img {
		height: 400rpx;
		margin: 20rpx;
	}

	.vaccine {
		display: flex;
		justify-content: space-between;
	}

	.vaccine text {
		width: 25%;
		margin: 20rpx;
		box-sizing: border-box;
		height: 100rpx;
	}
	.fast-nav {
		display: flex;
		flex-wrap: wrap;
	}
	.fast-nav view {
		width: 25%;
		height: 100rpx;
		margin:20rpx 0;
		text-align: center;
		
	}
	.fast-nav view view{
		width: 100rpx;
		height: 100rpx;
		box-sizing: border-box;
		text-align: center;
		margin:0 auto;
		border-radius: 30%;
		background-color: #f3f3f3;
	}
	
	/* .fast-nav view {
		width: 25%;
		height: 100rpx;
		text-align: center;
		background-color: #f00;
	} */
	.phy text {
		width: 50% !important;
		height: 200rpx;
	}

	.regist {
		flex-wrap: wrap;
	}

	.regist text {
		width: calc(33% - 20rpx*2);
		margin: 20rpx;
	}
</style>
