<template>
	<view class="list">
		<view class="listshow" v-for="(list,listindex) in news" :key="listindex">
			<image :src="list.cover" mode="heightFix" lazy-load></image>
			<text class="title">{{list.title}}</text>
			<view>{{list.desc}}</view>
			<p-price>
				<template #newPrice>
					<text class="p-pprice">
						<text class="list-iconrmb">￥</text><text class="list-pprice">{{list.pprice}}</text>
					</text>
				</template>
				<template #oldPrice>
					<text class="p-oprice">
						<text class="list-iconrmb">￥</text><text class="list-oprice">{{list.oprice}}</text>
					</text>
				</template>
			</p-price>
		</view>
	</view>
</template>

<script setup lang="ts">
	defineProps(['news'])
</script>

<style lang="less" scoped>
	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		/* text-indent: 10rpx; */
	}

	.list .listshow {
		width: 50%;
		margin: 10rpx 0;
	}

	.list .listshow image {
		max-width: 100%;
		display: block;
		margin: 0 auto;
	}

	.list .listshow view {
		white-space: normal;
		word-break: break-all;
		word-warp: break-word;
		font-size: 28rpx;
	}

	.list .listshow .title {
		display: inline-block;
		/* padding:16rpx 0 10rpx 0; */
		font-size: 32rpx;
		font-weight: 700;
	}

	.p-pprice {
		color: #f60;
		font-size: 32rpx;
	}

	.p-pprice .list-iconrmb {
		font-size: 20rpx;
	}

	.p-pprice .list-pprice {
		font-weight: 900;
	}

	.p-oprice {
		color: #ccc;
		text-decoration: line-through;
	}
</style>