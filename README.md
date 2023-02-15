# @buxweb/time
A utility for generating a calendar data.
the Data format is typed as CalendarMonth.

### CalendarMonth
CalendarMonth is an array like this.
```typescript
type CalendarDate = [number, number]
type CalendarWeek = Array<CalendarDate>
type CalendarMonth = Array<CalendarWeek>
```

## Installation
```
npm install @buxweb/calendar
```

## USAGE

```javascript
import {Calendar} from '@buxweb/time'
const cal = new Calendar(2023, 1)
const calendar2023Jan = cal.getCalendar()

cal.turnOver()
calendar2023Feb = cal.getCalendar()

const revert = true
cal.turnOver(revert)
if(calendar2023Jan === cal.getCalendar()){
    console.log("revert succesed.")
}
```



