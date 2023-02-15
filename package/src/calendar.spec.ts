import {it, describe, expect, beforeEach} from 'vitest'

import { CalendarMonth, CalendarWeek } from './calendar.d'
import {Calendar} from "./calendar"


describe("Calendar", ()=>{
    let calendar: Calendar
    beforeEach(()=>{
        calendar = new Calendar(2023,1)
    })

    it("can make Calendar:CalendarMonth", ()=>{
        const days = 31
        let startDayIndex = 0
        const expectedCalendar = makeExpectedCalenar(days, startDayIndex)

        const testCalendar: CalendarMonth = calendar.getCalendar()
        expect(testCalendar).toEqual(expectedCalendar)
    })

    it("can turnover the caledar (month+1)", ()=>{
        const days =28
        const startDayIndex = 3
        const expectedCalendar = makeExpectedCalenar(days, startDayIndex)

        calendar.turnover()
        const testCalendar = calendar.getCalendar()
        expect(testCalendar).toEqual(expectedCalendar)

    })
    
    it("can turnover the caledar (month - 1)", ()=>{
        const days = 31
        const startDayIndex = 4
        const expectedCalendar = makeExpectedCalenar(days, startDayIndex)
        const expectedYear = 2022

        const revert = true
        calendar.turnover(revert)
        const testCalendar = calendar.getCalendar()
        const testYear = calendar.year

        expect(testCalendar).toEqual(expectedCalendar)
        expect(testYear).toBe(expectedYear)
    })
})


function makeExpectedCalenar(days:number, startDayIndex:number):CalendarMonth{
    let date = 1
    let expectedCalendar: CalendarMonth = []
    let dayIndex = startDayIndex
    while(date < days){
        let week: CalendarWeek = []
        for(let i = dayIndex; i < 7; i++){
            if(date > days) break
            week.push([i, date])
            date++
        }
        expectedCalendar.push(week)
        dayIndex = 0
    }
    return expectedCalendar
}