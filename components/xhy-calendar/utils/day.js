class Day{
	constructor(datetime) {
		datetime = datetime.replace(/-/gi,'/');
	    this.date = datetime && datetime.length ? new Date(datetime) : new Date();
		this.year = this.date.getFullYear();
		this.month = this.date.getMonth();
		this.day = this.date.getDate();
		this.hour = this.date.getHours();
		this.minute = this.date.getMinutes();
		this.second = this.date.getSeconds();
		this.milliSecond = this.date.getMilliseconds();
		this.timestamp = this.date.getTime();
		this.weekday = this.date.getDay();
	}
	getCurrentMonthDays(){
		const { year,month } = this;
		return new Date(year,month+1,0).getDate();
	}
	weekdayOfFirstDayInMonth(){
		const { year,month } = this;
		return new Date(year,month,1).getDay();
	}
	weekdayOfLastDayInMonth(){
		const { year,month } = this;
		return new Date(year,month,this.getCurrentMonthDays()).getDay();
	}
	getLastMonthDays(){
		const { year,month } = this;
		return new Date(year,month,0).getDate();
	}
	getNextMonthDays(){
		const { year,month } = this;
		return new Date(year,month+2,0).getDate();
	}
	isYesterday(){
		const diff = (new this.constructor(new this.constructor().toArray().slice(0,3).join('-'))).timestamp - (new this.constructor(this.toArray().slice(0,3).join('-'))).timestamp;
		return diff === 1 * 24 * 60 * 60 * 1000;
	}
	isToday(){
		return (new this.constructor(new this.constructor().toArray().slice(0,3).join('-'))).timestamp === (new this.constructor(this.toArray().slice(0,3).join('-'))).timestamp;
	}
	isTomorrow(){
		const diff = (new this.constructor(new this.constructor().toArray().slice(0,3).join('-'))).timestamp - (new this.constructor(this.toArray().slice(0,3).join('-'))).timestamp;
		return diff === - 1 * 24 * 60 * 60 * 1000;
	}
	toObject(){
		const { year,month,day,hour,minute,second,milliSecond,timestamp,weekday } = this;
		return { year,month,day,hour,minute,second,milliSecond,timestamp,weekday }
	}
	toArray(){
		const { year,month,day,hour,minute,second,milliSecond,timestamp,weekday } = this;
		return [year,month,day,hour,minute,second,milliSecond,timestamp,weekday];
	}
	isLeapYear(){
		return ((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0)
	}
}
export default Day;