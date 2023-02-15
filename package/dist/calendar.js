export class Calendar {
    constructor(year, month) {
        const defaultDate = new Date();
        this.year = year ? year : defaultDate.getFullYear();
        this.month = month ? month : defaultDate.getMonth() + 1;
    }
    get days() {
        const nextMonthIndex = this.month;
        return new Date(this.year, nextMonthIndex, 0).getDate();
    }
    get firstDayIndex() {
        const monthIndex = this.month - 1;
        return new Date(this.year, monthIndex, 1).getDay();
    }
    getCalendar() {
        let date = 1;
        let calendar = [];
        let dayIndex = this.firstDayIndex;
        while (date < this.days) {
            let week = [];
            for (let i = dayIndex; i < 7; i++) {
                if (date > this.days)
                    break;
                week.push([i, date]);
                date++;
            }
            calendar.push(week);
            dayIndex = 0;
        }
        return calendar;
    }
    turnover(revert = false) {
        if (revert) {
            let prevMonth = this.month - 1;
            if (prevMonth < 1) {
                prevMonth = 12;
                this.year--;
                this.month = prevMonth;
            }
            else {
                this.month = prevMonth;
            }
        }
        else {
            let nextMonth = this.month + 1;
            if (nextMonth > 12) {
                nextMonth = 1;
                this.year++;
                this.month = nextMonth;
            }
            else {
                this.month++;
                console.log(this);
            }
        }
    }
}
