<template>
	<view class="d-inline-block position-relative">
		<button size="mini" class="my-1 mx-1" :style="getStyle" @click="pushClick"
			:class="bool?'main-bg-color':''">{{item.name}}</button>
		<slot></slot>
	</view>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	let props = defineProps(['item', 'color', 'bool'])
	let emit = defineEmits(['click'])
	const getStyle = computed(() => {
		if (props.color) {
			let borderColor = ['#EEA6AA', '#DD6A4B', '#98D5D8', '#9DBE93', '#BCCD99'];
			let backGround = ['#F8EAE9', '#FFBEC6', '#E8F6F6', '#E4F5E2', '#F2F6E8'];
			let index = Math.floor(Math.random() * borderColor.length)
			let backgroundcolor = backGround[index]
			let bordercolor = borderColor[index]
			return `background:${backgroundcolor}; border:1rpx solid ${bordercolor}`
		} else {
			return `background:#fff`
		}
	})
	const pushClick = () => {
		emit('click')
	}
</script>

<style lang="less" scoped>

</style>