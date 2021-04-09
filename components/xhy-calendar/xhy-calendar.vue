<template>
	<view class="xhy-calendar">
		<view class="xhr-calendar-mask" v-if="showMask||mode==='slide'"></view>
		<template v-if="mode === 'insert'">
			<xhy-date></xhy-date>
		</template>
		<template v-else-if="mode === 'popup'">
			<view></view>
		</template>
		<template v-else>
			<view></view>
		</template>
	</view>
</template>

<script>
	import Day from './utils/day.js'
	import xhyDate from './xhy-date.vue'
	export default{
		name: 'xhyCalendar',
		components: { xhyDate },
		props: {
			mode: {
				type: String,
				default: 'insert'
			},
			showMask: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				date: new Date()
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.xhr-calendar-mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba($color: #000000, $alpha: 0.3);
	}
</style>
