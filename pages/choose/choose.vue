<template>
	<view>
		<view class="d-flex choose-title a-center">
			<view class="span-15 d-flex">
				<view class="span24-8 d-flex j-center a-center left-title" v-for="(item,index) in screen.list"
					:key="index" @click="changeIndex(index)">
					<view :class="screen.currentIndex == index?'main-text-color':''">
						{{item.name}}
					</view>
					<view class="icon-wrapper ">
						<view class="iconfont icon-sort-up-full line-h0" :class="item.status==1?'main-text-color':''">

						</view>
						<view class="iconfont icon-sort-down-full line-h0" :class="item.status==2?'main-text-color':''">

						</view>
					</view>
				</view>
			</view>
			<view class="span-5 text-center right-title" @click="showDrawer">
				筛选
			</view>
		</view>
		<uni-drawer ref="showRight" mode="right" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<color-tag :color="false" v-for="(item,l) in label.list" :key="l" :item="item"
					:bool="label.selected == l" @click="changeTag(l)"></color-tag>
			</scroll-view>
		</uni-drawer>
		<template v-if="isLoading">
			<view class="text-center text-muted my-2">
				<image src="/static/loading.gif" mode="" style="width: 80rpx;height: 80rpx;"></image>
			</view>
		</template>
		<template v-else>
			<template v-if="list.length>0">
				<searchicon-list v-for="(item,s) in list" :key="s" :item="item"></searchicon-list>
				<view class="l-loadmore text-center my-3">
					{{loadmore}}
				</view>
			</template>
			<template v-else>
				<view class="text-center text-muted my-2">
					暂无数据
				</view>
			</template>
		</template>

	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
		toRefs,
		onMounted,
		computed
	} from 'vue'
	import {	//引入接口
		getChoose
	} from '../../api'
	import {
		onLoad,
		onPullDownRefresh,
		onReachBottom
	} from '@dcloudio/uni-app'
	let showRight = ref();
	let page = ref(1)
	let title = ref('')
	let list = ref([]) //res请求是数据存放在数组里
	let loadmore = ref('加载更多...')
	let isLoading = ref(true)
	let screen = ref({	//tab栏
		currentIndex: 0,
		list: [{
			id: 1,
			name: '综合',
			status: 1,
			key: 'all'
		},
		{
			id: 2,
			name: '销量',
			status: 0,
			key: 'sale_count'
		},
		{
			id: 3,
			name: '价格',
			status: 0,
			key: 'min_price'
		}
		]
	})
	let label = ref({	//筛选
		selected: 0,
		list: [{
			id: 1,
			name: '不限',
			rule: false,
			value: false
		}, {
			id: 2,
			name: '100-200',
			rule: 'between',
			value: '100-200'
		}, {
			id: 3,
			name: '200-300',
			rule: 'between',
			value: '200-300'
		}, {
			id: 4,
			name: '200-400',
			rule: 'between',
			value: '300-400'
		}, {
			id: 5,
			name: '400以上',
			rule: '>',
			value: '400'
		}
		]
	})

	/****************************************** 
	 *
	 * currentIndex指的是整个choose页面顶部tap栏的索引，
	 * list里status指每个tap栏中上下箭头的索引（小索引）
	 * 默认是currentIndex=0指‘综合’，当点‘销量’时，新索引index为1，即对应‘销量’，
	 * 所以既要获得新值，也要将tap索引currentIndex更换为新索引
	 * 
	 * 这里status指上下箭头，0表示不亮，1表示上箭头，2表示下箭头
	 * 这里也许可以用ts中的枚举
	 * 
	 ******************************************/
	const changeIndex = (index : number) => {
		let oldIndex = screen.value.currentIndex	//获取原来的索引（点击之前的索引）
		let oldItem = screen.value.list[oldIndex]	//获取旧索引对应的属性
		if (index == oldIndex) {	//如果点击的索引与旧索引相同
			oldItem.status = oldItem.status == 1 ? 2 : 1	//判断小索引是否为1，是则变成2，否则为1（以达到点击来回切换的效果）
			getchoose()	//切换后请求数据
			return
		} else {
			let newItem = screen.value.list[index]	//获取新的索引对应的属性
			newItem.status = 1	//该属性的小索引变为1
			oldItem.status = 0	//旧属性的小索引变为0
			screen.value.currentIndex = index	//将整个screen的索引变为目前的新索引
			getchoose()	//切换后请求数据
			return
		}
	}
	//抽屉效果
	const showDrawer = () => {
		showRight.value.open();
	}
	const closeDrawer = () => {
		showRight.value.close();
	}
	const changeTag = (index : number) => { //改变抽屉内的索引
		label.value.selected = index
		getchoose()	//切换后请求数据
		return
	}
	const options = computed(() => {	//用计算属性实现 动态key值
		let obj = screen.value.list[screen.value.currentIndex]	//获取到目前选中的tab栏
		let value = obj.status == 1 ? 'asc' : 'desc'
		console.log('options', options);
		return {
			[obj.key]: value
		}
	})
	const getCondition = () => {	//用方法实现 筛选功能
		let obj = label.value.list[label.value.selected]
		if (obj.rule && obj.value) {	//查看rule和value是否存在
			return {
				price: `${obj.rule},${obj.value}`	//存在进行筛选
			}
		} else {
			return	//不存在直接出结果
		}
	}
	onLoad(e => {	//将搜索框的值赋值给title然后去向后端索要数据
		// console.log('e', e);
		title.value = e.key
	})
	onMounted(() => {
		getchoose()
	})
	const getchoose = (refresh, callback) => {
		let pages = refresh ? 1 : page.value
		getChoose({
			title: title.value,
			page: pages,
			...options.value,	//点value是因为return的value
			...getCondition()	//函数也可以作为参数传
		}).then(res => {
			console.log('res', res);
			isLoading.value = false
			let getData = formatter(res.data)
			list.value = refresh ? [...getData] : [...list.value, ...getData]
			loadmore.value = getData.length < 6 ? '没有更多了...' : '加载更多...'
			if (typeof callback == 'function') {
				callback()
			}
		})
	}

	const formatter = (res) => {	//格式化数据，将res请求的数据的属性名更换成统一封装的属性名
		return res.map(v => {
			let satisfaction = (v.comments_good_count / v.comments_count) * 100
			return {
				titlepic: v.cover,
				title: v.title,
				desc: v.desc,
				pprice: v.min_price,
				comment_num: v.comments_count,
				good_num: satisfaction.toFixed(2) + '%'
			}
		})
	}
	//监听下拉刷新
	onPullDownRefresh(() => {
		getchoose(true, () => {
			uni.showToast({
				title: '下拉刷新成功'
			})
		})
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 2000);
	})
	//监听上拉加载数据
	onReachBottom(() => {
		if (loadmore.value == '没有更多了...') {
			uni.showToast({
				title: '没有更多数据了',
				icon: 'none'
			})
			return
		} else {
			loadmore.value = '加载中...'
			page.value++
			getchoose(false, () => {
				uni.showToast({
					title: '上拉加载成功'
				})
			})
		}
	})
</script>

<style lang="less" scoped>
	.choose-title {
		width: 100%;
		height: 88rpx;
	}

	.left-title,
	.right-title {
		height: 88rpx;
		line-height: 88rpx;
	}
</style>