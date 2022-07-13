import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import minMax from 'dayjs/plugin/minMax'
import isoWeek from 'dayjs/plugin/isoWeek'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import vi from 'dayjs/locale/vi'
import en from 'dayjs/locale/en'

dayjs.locale(vi)

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(minMax)
dayjs.extend(isoWeek)
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(customParseFormat)

export class DateTime {
  date: dayjs.Dayjs

  constructor(d?: any, cfg?: any) {
    if (typeof d === 'number') {
      this.date = dayjs(d)
      return
    }
    this.date = dayjs(d, cfg)
  }

  format(v?: string) {
    return this.date.format(v)
  }

  toDate() {
    return this.date.toDate()
  }

  toISOString() {
    return this.date.toISOString()
  }

  toString() {
    return this.date.toString()
  }

  day() {
    return this.date.day()
  }

  month() {
    return this.date.month()
  }

  year() {
    return this.date.year()
  }

  hour() {
    return this.date.hour
  }

  isBefore(d: DateTime, ...arg: any[]) {
    return this.date.isBefore(d.date, ...arg)
  }

  isSameOrBefore(d: DateTime, ...arg: any[]) {
    return this.date.isSameOrBefore(d.date, ...arg)
  }

  isAfter(d: DateTime, ...arg: any[]) {
    return this.date.isAfter(d.date, ...arg)
  }

  isSameOrAfter(d: DateTime, ...arg: any[]) {
    return this.date.isSameOrAfter(d.date, ...arg)
  }

  isSame(d: DateTime, ...arg: any[]) {
    return this.date.isSame(d.date, ...arg)
  }

  minute() {
    return this.date.minute()
  }

  second() {
    return this.date.second()
  }

  weekday() {
    return this.date.isoWeekday() % 7
  }

  fromNow() {
    return this.date.fromNow()
  }

  unix() {
    return this.date.unix()
  }

  $utc() {
    this.date = this.date.utc()
    return this
  }

  utc() {
    return this.clone().$utc()
  }

  $add(number: any, unit: dayjs.ManipulateType): DateTime {
    this.date = this.date.add(number, unit)
    return this
  }

  add(number: number, unit: dayjs.ManipulateType) {
    return this.clone().$add(number, unit)
  }

  $subtract(number: number, unit: dayjs.ManipulateType): DateTime {
    this.date = this.date.subtract(number, unit)
    return this
  }

  subtract(number: number, unit: dayjs.ManipulateType) {
    return this.clone().$subtract(number, unit)
  }

  clone() {
    return dateTime(this.date)
  }

  locale(locale: string, obj?: any) {
    this.date.locale(locale, obj)
    return this
  }
}

export type DateType = DateTime

function dateTime(d?: any, format?: any): DateType {
  if (d instanceof DateTime) {
    return d as DateType
  }
  return new DateTime(d, format) as DateType
}

dateTime.prototype = DateTime.prototype

dateTime.unix = (n: number) => dateTime(n * 1000)

dateTime.max = (days: DateType[]) => {
  return dateTime(dayjs.max(days.map(i => i.date)))
}

dateTime.min = (days: DateType[]) => {
  return dateTime(dayjs.min(days.map(i => i.date)))
}

export default dateTime

export const updateLocale = (locale: string) => {
  if (locale === 'vi') {
    dayjs.locale(vi)
    return
  }

  if (locale === 'en') {
    dayjs.locale(en)
  }
}
