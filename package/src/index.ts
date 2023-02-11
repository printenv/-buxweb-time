export class TimeWithOffset{
    readonly offset: number
    constructor(offset=0){
        this.validateOffsetValue(offset)
        this.offset = offset
    }

    getMonth(dateObj:Date = new Date()):number{
        dateObj = this.adjustDateByOffset(dateObj)
        return dateObj.getUTCMonth() + 1
    }
    
    getDate(dateObj:Date = new Date()):number{
        dateObj = this.adjustDateByOffset(dateObj)
        return dateObj.getUTCDate()
    }

    getDay(dateObj:Date = new Date()):number{
        dateObj = this.adjustDateByOffset(dateObj)
        return dateObj.getUTCDay()
    }
 
    getHour(dateObj:Date = new Date()):number{
        dateObj = this.adjustDateByOffset(dateObj)
        return dateObj.getUTCHours()
    }

    getMinute(dateObj:Date = new Date()):number{
        dateObj = this.adjustDateByOffset(dateObj)
        return dateObj.getUTCMinutes()
    }

    private validateOffsetValue(offset:number):void{
        const offsetAbs = Math.abs(offset)
        if(offsetAbs > 11.5){
            throw new Error("offset has to be in a range from 0 to 12.")
        }
        const fraction = offsetAbs - Math.floor(offsetAbs)
        if(fraction !== 0){
            if(fraction !== 0.5){
                throw new Error("fraction of offset has to be 0 or 0.5.")
            }
        }
    }

    private adjustDateByOffset(dateObj: Date) : Date{
        const dateCopy = new Date(dateObj.getTime())
        const [hourOffset, minuteOffset] = this.extractHourAndMinute()
        let hour = dateCopy.getUTCHours() + hourOffset
        if(minuteOffset){
            let minute = dateCopy.getUTCMinutes() + minuteOffset
            if(minute >= 60){
                minute -= 60
                dateCopy.setUTCMinutes(minute)
                hour++
            }else if(minute < 0){
                minute += 60
                dateCopy.setUTCMinutes(minute)
                hour--
            }
        
        }
        if(hour < 0){
            hour += 24
            dateCopy.setUTCDate(dateCopy.getUTCDate() - 1)
        }else if(hour >= 24){
            hour -= 24
            dateCopy.setUTCDate(dateCopy.getUTCDate() + 1)
        }
        dateCopy.setUTCHours(hour)
        return dateCopy
    }
    
    private extractHourAndMinute(): [number, number]{
        const isOffsetNegative = this.offset < 0 ? true : false
        const absOffset = Math.abs(this.offset)

        let hour = Math.floor(absOffset)
        let minute = Math.abs(absOffset - hour) * 60
        if(isOffsetNegative){
            hour *= -1
            minute *= -1
        }
        return [hour, minute]
    }

}

export const days = {
    japanese: ["日","月","火","水","木","金","土"],
    english: ["Sun.", "Mon.", "Tue", "Wed.", "Thu.", "Fri.", "Sat"]
}