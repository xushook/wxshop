<template>
	<view>
		<view class="row p-2 border-bottom border-light-secondary animated fadeIn faster">
			<view class="span-6">
				<image :src="item.titlepic" mode="widthFix" class="w-100"></image>
			</view>
			<view class="span-14 pl-3 d-flex flex-column">
				<view class="font-md font-weight">{{item.title}}</view>
				<view class="font text-light-muted line-h-md mb-auto">
					{{item.desc}}
				</view>
				<p-price>
					<template #newPrice>
						<text class="pprice">￥<text>{{item.pprice}}</text></text>
					</template>
				</p-price>
				<view class="font-sm text-light-muted">
					{{item.comment_num}} 条评论 {{item.good_num}}满意
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted
	} from 'vue';
	const props = defineProps(['item'])
</script>
<style scoped>
	.pprice {
		font-size: 20rpx;
		color: #f60;
	}

	.pprice text {
		font-size: 34rpx;
		color: #f60;
		font-weight: 900;
	}
</style>