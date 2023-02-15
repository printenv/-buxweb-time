import {CalendarWeek, CalendarMonth} from 'calendar.d'

export class Calendar {
    year: number
    month: number
    constructor(year:number, month:number){
        const defaultDate = new Date()
        this.year = year ? year : defaultDate.getFullYear()
        this.month = month ? month : defaultDate.getMonth() + 1
    }

    get days():number {
        const nextMonthIndex = this.month
        return new Date(this.year, nextMonthIndex, 0).getDate()
    }
    get firstDayIndex():number{
        const monthIndex = this.month - 1
        return new Date(this.year, monthIndex, 1).getDay()
    }

    getCalendar():CalendarMonth{
        let date:number = 1
        let calendar:CalendarMonth = []
        let dayIndex = this.firstDayIndex
        while(date < this.days){
            let week:CalendarWeek = []
            for(let i = dayIndex; i < 7; i++){
                if(date > this.days) break
                week.push([i, date])
                date ++
            }
            calendar.push(week)
            dayIndex = 0
        }
        return calendar
    }

    turnover(revert=false):void{
        if(revert){
            let prevMonth = this.month - 1
            if(prevMonth < 1){
                prevMonth = 12
                this.year --
                this.month = prevMonth
            }else{
                this.month = prevMonth
            }
        }else{
            let nextMonth = this.month + 1
            if(nextMonth > 12){
                nextMonth = 1
                this.year++
                this.month = nextMonth
            }else{
                this.month++
                console.log(this)
            }
        }
    }
}
