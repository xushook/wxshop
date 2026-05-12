<template>
	<view>
		<uni-easyinput prefixIcon="search" v-model="keyval" placeholder="请输入内容" @iconClick="searchClick"
			@change="changeCon"></uni-easyinput>
		<one-adv title="热门搜索" cover="../../static/images/demo4.jpg">
			<color-tag v-for="(item,index) in hot" :key="index" :item="item" :color="true"
				@click="btnItem(item)"></color-tag>
		</one-adv>
		<one-adv title="常用分类">
			<color-tag v-for="(item,index) in cate" :key="index" :item="item" :color="false"
				@click="btnItem(item)"></color-tag>
		</one-adv>
		<one-adv title="历史记录" cover="../../static/images/del.png" :bool="true" @setChange="getChange"
			@completeIconAll="completeAll" @delIconAll="delAll">
			<color-tag v-for="(item,index) in history" :key="index" :item="{name:item}" :color="false"
				@click="btnItem(item)">
				<icon type="clear" size="16" class="position-absolute icon-img" v-show="isShow"></icon>
			</color-tag>
		</one-adv>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		toRefs,
		onMounted
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app'
	let keyval = ref();
	let hot = ref([{
			name: '领券中心'
		},
		{
			name: 'Redmi K20'
		},
		{
			name: 'RedmiBook 14'
		},
		{
			name: '智能积木 越野四驱车'
		},
		{
			name: '手环 腕带'
		},
	])
	let cate = ref([{
			name: '耳机'
		},
		{
			name: '手机'
		},
		{
			name: '小米'
		},
		{
			name: '音箱'
		},
		{
			name: '手表'
		},
		{
			name: '配件'
		},
		{
			name: '网关/传感器'
		},
		{
			name: '健康'
		},
		{
			name: '酷玩'
		},
	])
	let history = ref([]);
	let isShow = ref(false)

	//点击搜索
	const searchClick = () => {
		console.log('icon');
		let index = history.value.indexOf(keyval.value)
		if (index == -1) {
			history.value.unshift(keyval.value)
			uni.setStorageSync('history_key', history.value)
		} else {
			history.value.splice(index, 1)
			history.value.unshift(keyval.value)
			uni.setStorageSync('history_key', history.value)
		}
		uni.navigateTo({
			url: `/pages/choose/choose?key=${keyval.value}`
		})
	}
	//仅在输入框失去焦点或用户按下回车时触发
	const changeCon = () => {
		console.log('keyval.value', keyval.value);
		if (/^\s*$/.test(keyval.value)) {
			uni.showToast({
				title: '请不要输入空白内容',
				icon: 'none'
			})
			return
		} else if (keyval.value == undefined) {
			uni.showToast({
				title: '请输入搜索内容',
				icon: 'none'
			})
			return
		} else {
			console.log('111111', /^\s*$/.test('history_key'));
		}
	}
	const getChange = () => {
		isShow.value = true
	}
	const completeAll = () => {
		isShow.value = false
	}
	const delAll = () => {
		uni.showModal({
			title: '提示',
			content: '请问，要全部删除吗',
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定');
					history.value = []
					uni.removeStorageSync('history_key');
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	onShow(() => {
		const historyval = uni.getStorageSync('history_key');
		if (historyval) {
			history.value = historyval
		}
	})
	const btnItem = (item) => {
		if (item?.name) {
			keyval.value = item.name
		} else {
			keyval.value = item
		}
	}
</script>

<style lang="less">
	.icon-img {
		right: 4rpx;
		top: 0;
	}
</style>