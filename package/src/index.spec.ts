import {it, describe, expect, beforeEach} from 'vitest'


import {TimeWithOffset} from "./index"


describe("TimeWithOffset", ()=>{
    let myTime: TimeWithOffset
    const offset = 0.5

    //2022-1-31 23:30 UTC
    //2022-2-01 0:00 UTC + 0:30
    let date_ts = Date.UTC(2022, 0, 31, 23, 30, 0)
    let dateObj = new Date(date_ts)
    const expected = {
        year: 2022,
        month: 2,
        date: 1,
        hour: 0,
        minute: 0,
        dayIndex: (dateObj.getUTCDay() + 1) % 7
    }

    beforeEach(()=>{
        myTime = new TimeWithOffset(offset)
        date_ts = Date.UTC(2022, 0, 31, 23, 30, 0)
        dateObj = new Date(date_ts)
    })

    it("can return hour with time offset considered", ()=>{
        const month = myTime.getMonth(dateObj)
        expect(month).toBe(expected.month)
    })

    it("can return date with time offset considered", ()=>{
        const date = myTime.getDate(dateObj)
        expect(date).toBe(expected.date)
    })

    it("can return a index of day of the week with time offset considered", ()=>{
        const dayIndex = myTime.getDay(dateObj)
        expect(dayIndex).toBe(expected.dayIndex)
    })

    it("can return hour with time offset considered", ()=>{
        const hour = myTime.getHour(dateObj)
        expect(hour).toBe(expected.hour)
    })

    it("can return minute with time offset considered", ()=>{
        const minute = myTime.getMinute(dateObj)
            expect(minute).toBe(expected.minute)
    })

    it("throws error if initialized with fraction that is not 0.5 or 0.", ()=>{
        const test = () => {
            const test = new TimeWithOffset(1.3)
        }
        expect(test).toThrowError()
    })

    it("throws errror if offset value is not in range of 0–12", ()=>{
        const test = () => {
            const test = new TimeWithOffset(12)
        }
        expect(test).toThrowError() 
    })


    it("does not change original Date object passed as a parameter", ()=>{
        const month = myTime.getMonth(dateObj)
        const date = myTime.getDate(dateObj)
        expect(dateObj.getTime()).toBe(date_ts)
    })
})
