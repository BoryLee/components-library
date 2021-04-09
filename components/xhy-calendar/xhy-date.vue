<template>
	<view class="date-container">
		<view class="date-weekday">
			<block v-for="(weekday,index) in chinaWeeks" :key='index'>
				<view class="weekday">
					<text>{{weekday}}</text>
				</view>
			</block>
		</view>
		<view class="date-body">
			<block v-for="(item,index) in days" :key='index'>
				<view :class="[getCellClass(item),'date-cell',{'select-cell': selectCells.indexOf(index) > -1}]" @click="selectCell(index)">
					<text>{{item.text}}</text>
					<view class="date-cell-list">
					</view>
				</view>
			</block>

		</view>
	</view>
</template>

<script>
	import {
		chinaWeeks
	} from './utils/constant.js'
	import Day from './utils/day.js'
	export default {
		name: 'xhyDate',
		props: {
			datetime: {
				type: String,
				default: '2021-04-09'
			}
		},
		data() {
			return {
				chinaWeeks,
				days: [],
				day: null,
				selectCells: []
			}
		},
		methods: {
			selectCell(index){
				let selectIndex = this.selectCells.indexOf(index)
				if(selectIndex >  -1){
					this.selectCells.splice(selectIndex,1);
				}else{
					this.selectCells.push(index)
				}
			},
			getCellClass(item) {
				const { day } = this.day;
				let type = item.type;
				if(type === 'current'){
					if(Number(item.text) === day){
						type = 'today'
					}
				}
				return type;
			},
			transferDayArray(type, num, day) {
				let array = [],
					weekday;
				while (num > 0) {
					array.unshift({
						type,
						text: num
					});
					--num;
				}
				if (type === 'last') {
					weekday = day.weekdayOfFirstDayInMonth();
					array = array.slice(-weekday);
				} else if (type === 'next') {
					weekday = day.weekdayOfLastDayInMonth()
					if(this.lastWeekDay>0){
						weekday = this.lastWeekDay
					}
					array = array.slice(0, weekday);
				}
				return array;
			}
		},
		mounted() {
			const day = new Day(this.datetime);
			const {
				month,
				weekday
			} = day;
			this.day = day;
			const daysInLastMonth = day.getLastMonthDays();
			const daysInMonth = day.getCurrentMonthDays();
			const daysInNextMonth = day.getNextMonthDays();
			const currentDays = this.transferDayArray('current', daysInMonth, day);
			const lastDays = this.transferDayArray('last', daysInLastMonth, day);
			if(Number(42 - currentDays.length - lastDays.length) > Number(day.weekdayOfLastDayInMonth())){
				this.lastWeekDay = Number(42 - currentDays.length - lastDays.length);
			}
			const nextDays = this.transferDayArray('next', daysInNextMonth, day);
			this.days = [...lastDays,...currentDays,...nextDays]
		}
	}
</script>

<style lang="scss" scoped>
	.date-container {
		padding: 20rpx;
		box-sizing: border-box;

		.date-weekday {
			display: flex;
			padding: 20rpx 0;
			border-top: 2rpx solid #f5f5f5;
			border-bottom: 2rpx solid #f5f5f5;

			.weekday {
				width: calc(100% / 7);
				text-align: center;
			}
		}
		.date-body{
			display: flex;
			flex-wrap: wrap;
			.date-cell{
				width: calc(100% / 7);
				text-align: center;
				padding: 30rpx 0;
				box-sizing: border-box;
				.date-cell-list{
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
		}
		.today{
			background-color: skyblue;
			color: #fff;
			border-radius: 50%;
		}
		.select-cell{
			background-color: red;
			color: #fff;
			border-radius: 50%;
		}
	}
</style>
