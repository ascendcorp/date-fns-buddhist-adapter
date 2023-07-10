// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import type { DateIOFormats } from '@date-io/core/IUtils'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import longFormatters from 'date-fns/_lib/format/longFormatters'
import addDays from 'date-fns/addDays'
import addHours from 'date-fns/addHours'
import addMinutes from 'date-fns/addMinutes'
import addMonths from 'date-fns/addMonths'
import addSeconds from 'date-fns/addSeconds'
import addWeeks from 'date-fns/addWeeks'
import addYears from 'date-fns/addYears'
import differenceInDays from 'date-fns/differenceInDays'
import differenceInHours from 'date-fns/differenceInHours'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInMonths from 'date-fns/differenceInMonths'
import differenceInQuarters from 'date-fns/differenceInQuarters'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import differenceInWeeks from 'date-fns/differenceInWeeks'
import differenceInYears from 'date-fns/differenceInYears'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import endOfDay from 'date-fns/endOfDay'
import endOfMonth from 'date-fns/endOfMonth'
import endOfWeek from 'date-fns/endOfWeek'
import endOfYear from 'date-fns/endOfYear'
import format from 'date-fns/format'
import formatISO from 'date-fns/formatISO'
import getDate from 'date-fns/getDate'
import getDay from 'date-fns/getDay'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import getHours from 'date-fns/getHours'
import getMilliseconds from 'date-fns/getMilliseconds'
import getSeconds from 'date-fns/getSeconds'
import getWeek from 'date-fns/getWeek'
import getYear from 'date-fns/getYear'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import isEqual from 'date-fns/isEqual'
import isSameDay from 'date-fns/isSameDay'
import isSameHour from 'date-fns/isSameHour'
import isSameMonth from 'date-fns/isSameMonth'
import isSameYear from 'date-fns/isSameYear'
import isValid from 'date-fns/isValid'
import isWithinInterval from 'date-fns/isWithinInterval'
import defaultLocale from 'date-fns/locale/en-US'
import dateFnsParse from 'date-fns/parse'
import parseISO from 'date-fns/parseISO'
import setDate from 'date-fns/setDate'
import setHours from 'date-fns/setHours'
import setMilliseconds from 'date-fns/setMilliseconds'
import setMinutes from 'date-fns/setMinutes'
import setMonth from 'date-fns/setMonth'
import setSeconds from 'date-fns/setSeconds'
import setYear from 'date-fns/setYear'
import startOfDay from 'date-fns/startOfDay'
import startOfMonth from 'date-fns/startOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import startOfYear from 'date-fns/startOfYear'

import type {
  AdapterFormats,
  AdapterOptions,
  AdapterUnits,
  FieldFormatTokenMap,
  MuiPickersAdapter,
} from './models'

type DateFnsLocale = typeof defaultLocale

const formatTokenMap: FieldFormatTokenMap = {
  // Year
  y: { sectionType: 'year', contentType: 'digit', maxLength: 4 },
  yy: 'year',
  yyy: { sectionType: 'year', contentType: 'digit', maxLength: 4 },
  yyyy: { sectionType: 'year', contentType: 'digit', maxLength: 4 },

  // Month
  M: { sectionType: 'month', contentType: 'digit', maxLength: 2 },
  MM: 'month',
  MMMM: { sectionType: 'month', contentType: 'letter' },
  MMM: { sectionType: 'month', contentType: 'letter' },
  L: { sectionType: 'month', contentType: 'digit', maxLength: 2 },
  LL: 'month',
  LLL: { sectionType: 'month', contentType: 'letter' },
  LLLL: { sectionType: 'month', contentType: 'letter' },

  // Day of the month
  d: { sectionType: 'day', contentType: 'digit', maxLength: 2 },
  dd: 'day',
  do: { sectionType: 'day', contentType: 'digit-with-letter' },

  // Day of the week
  E: { sectionType: 'weekDay', contentType: 'letter' },
  EE: { sectionType: 'weekDay', contentType: 'letter' },
  EEE: { sectionType: 'weekDay', contentType: 'letter' },
  EEEE: { sectionType: 'weekDay', contentType: 'letter' },
  EEEEE: { sectionType: 'weekDay', contentType: 'letter' },
  i: { sectionType: 'weekDay', contentType: 'digit', maxLength: 1 },
  ii: 'weekDay',
  iii: { sectionType: 'weekDay', contentType: 'letter' },
  iiii: { sectionType: 'weekDay', contentType: 'letter' },
  e: { sectionType: 'weekDay', contentType: 'digit', maxLength: 1 },
  ee: 'weekDay',
  eee: { sectionType: 'weekDay', contentType: 'letter' },
  eeee: { sectionType: 'weekDay', contentType: 'letter' },
  eeeee: { sectionType: 'weekDay', contentType: 'letter' },
  eeeeee: { sectionType: 'weekDay', contentType: 'letter' },
  c: { sectionType: 'weekDay', contentType: 'digit', maxLength: 1 },
  cc: 'weekDay',
  ccc: { sectionType: 'weekDay', contentType: 'letter' },
  cccc: { sectionType: 'weekDay', contentType: 'letter' },
  ccccc: { sectionType: 'weekDay', contentType: 'letter' },
  cccccc: { sectionType: 'weekDay', contentType: 'letter' },

  // Meridiem
  a: 'meridiem',
  aa: 'meridiem',
  aaa: 'meridiem',

  // Hours
  H: { sectionType: 'hours', contentType: 'digit', maxLength: 2 },
  HH: 'hours',
  h: { sectionType: 'hours', contentType: 'digit', maxLength: 2 },
  hh: 'hours',

  // Minutes
  m: { sectionType: 'minutes', contentType: 'digit', maxLength: 2 },
  mm: 'minutes',

  // Seconds
  s: { sectionType: 'seconds', contentType: 'digit', maxLength: 2 },
  ss: 'seconds',
}

const defaultFormats: DateIOFormats = {
  dayOfMonth: 'd',
  fullDate: 'PP',
  fullDateWithWeekday: 'PPPP',
  fullDateTime: 'PP p',
  fullDateTime12h: 'PP hh:mm aaa',
  fullDateTime24h: 'PP HH:mm',
  fullTime: 'p',
  fullTime12h: 'hh:mm aaa',
  fullTime24h: 'HH:mm',
  hours12h: 'hh',
  hours24h: 'HH',
  keyboardDate: 'P',
  keyboardDateTime: 'P p',
  keyboardDateTime12h: 'P hh:mm aaa',
  keyboardDateTime24h: 'P HH:mm',
  minutes: 'mm',
  month: 'LLLL',
  monthAndDate: 'MMMM d',
  monthAndYear: 'LLLL yyyy',
  monthShort: 'MMM',
  weekday: 'EEEE',
  weekdayShort: 'EEE',
  normalDate: 'd MMMM',
  normalDateWithWeekday: 'EEE, MMM d',
  seconds: 'ss',
  shortDate: 'MMM d',
  year: 'yyyy',
}

export default class AdapterDateFns
  implements MuiPickersAdapter<Date, DateFnsLocale>
{
  public isMUIAdapter = true
  public isTimezoneCompatible = false
  public lib = 'date-fns-buddhist'
  public locale?: DateFnsLocale
  public formats: AdapterFormats
  public formatTokenMap = formatTokenMap
  public escapedCharacters = { start: "'", end: "'" }

  constructor({ locale, formats }: AdapterOptions<DateFnsLocale, never> = {}) {
    this.locale = locale
    this.formats = { ...defaultFormats, ...formats, meridiem: '' }
  }

  // Note: date-fns input types are more lenient than this adapter, so we need to expose our more
  // strict signature and delegate to the more lenient signature. Otherwise, we have downstream type errors upon usage.
  public is12HourCycleInCurrentLocale = () => {
    if (this.locale) {
      return /a/.test(this.locale.formatLong!.time())
    }

    // By default date-fns is using en-US locale with am/pm enabled
    return true
  }

  public expandFormat = (format: string) => {
    const longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g

    // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31
    return format
      .match(longFormatRegexp)!
      .map((token: string) => {
        const firstCharacter = token[0]
        if (firstCharacter === 'p' || firstCharacter === 'P') {
          const longFormatter = longFormatters[firstCharacter]
          const locale = this.locale || defaultLocale
          return longFormatter(token, locale.formatLong, {})
        }
        return token
      })
      .join('')
  }

  public getFormatHelperText = (format: string) => {
    // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31
    const longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g
    const locale = this.locale || defaultLocale
    return format
      .match(longFormatRegexp)!
      .map((token) => {
        const firstCharacter = token[0]
        if (firstCharacter === 'p' || firstCharacter === 'P') {
          const longFormatter = longFormatters[firstCharacter]
          return longFormatter(token, locale.formatLong, {})
        }
        return token
      })
      .join('')
      .replace(/(aaa|aa|a)/g, '(a|p)m')
      .toLocaleLowerCase()
  }

  public parseISO = (isoString: string) => {
    return parseISO(isoString)
  }

  public toISO = (value: Date) => {
    return formatISO(value, { format: 'extended' })
  }

  public getCurrentLocaleCode = () => {
    return this.locale?.code || 'th-Th'
  }

  public addSeconds = (value: Date, count: number) => {
    return addSeconds(value, count)
  }

  public addMinutes = (value: Date, count: number) => {
    return addMinutes(value, count)
  }

  public addHours = (value: Date, count: number) => {
    return addHours(value, count)
  }

  public addDays = (value: Date, count: number) => {
    return addDays(value, count)
  }

  public addWeeks = (value: Date, count: number) => {
    return addWeeks(value, count)
  }

  public addMonths = (value: Date, count: number) => {
    return addMonths(value, count)
  }

  public addYears = (value: Date, amount: number) => {
    return addYears(value, amount)
  }

  public isValid = (value: any) => {
    return isValid(this.date(value))
  }

  public getDiff = (
    value: Date,
    comparing: Date | string,
    unit?: AdapterUnits,
  ) => {
    switch (unit) {
      case 'years':
        return differenceInYears(value, this.date(comparing) as Date)
      case 'quarters':
        return differenceInQuarters(value, this.date(comparing) as Date)
      case 'months':
        return differenceInMonths(value, this.date(comparing) as Date)
      case 'weeks':
        return differenceInWeeks(value, this.date(comparing) as Date)
      case 'days':
        return differenceInDays(value, this.date(comparing) as Date)
      case 'hours':
        return differenceInHours(value, this.date(comparing) as Date)
      case 'minutes':
        return differenceInMinutes(value, this.date(comparing) as Date)
      case 'seconds':
        return differenceInSeconds(value, this.date(comparing) as Date)
      default: {
        return differenceInMilliseconds(value, this.date(comparing) as Date)
      }
    }
  }

  public isAfter = (value: Date, comparing: Date) => {
    return isAfter(value, comparing)
  }

  public isBefore = (value: Date, comparing: Date) => {
    return isBefore(value, comparing)
  }

  public startOfDay = (value: Date) => {
    return startOfDay(value)
  }

  public endOfDay = (value: Date) => {
    return endOfDay(value)
  }

  public getHours = (value: Date) => {
    return getHours(value)
  }

  public setHours = (value: Date, count: number) => {
    return setHours(value, count)
  }

  public setMinutes = (value: Date, count: number) => {
    return setMinutes(value, count)
  }

  public getSeconds = (value: Date) => {
    return getSeconds(value)
  }

  public setSeconds = (value: Date, count: number) => {
    return setSeconds(value, count)
  }

  public setMilliseconds = (value: Date, milliseconds: number) => {
    return setMilliseconds(value, milliseconds)
  }

  public getMilliseconds = (value: Date) => {
    return getMilliseconds(value)
  }

  public isSameDay = (value: Date, comparing: Date) => {
    return isSameDay(value, comparing)
  }

  public isSameMonth = (value: Date, comparing: Date) => {
    return isSameMonth(value, comparing)
  }

  public isSameYear = (value: Date, comparing: Date) => {
    return isSameYear(value, comparing)
  }

  public isSameHour = (value: Date, comparing: Date) => {
    return isSameHour(value, comparing)
  }

  public startOfMonth = (value: Date) => {
    return startOfMonth(value)
  }

  public endOfMonth = (value: Date) => {
    return endOfMonth(value)
  }

  public startOfWeek = (value: Date) => {
    return startOfWeek(value, { locale: this.locale })
  }

  public endOfWeek = (value: Date) => {
    return endOfWeek(value, { locale: this.locale })
  }

  public startOfYear = (value: Date) => {
    return startOfYear(value)
  }

  public endOfYear = (value: Date) => {
    return endOfYear(value)
  }

  public getYear = (value: Date) => {
    return getYear(value)
  }

  public setYear = (value: Date, count: number) => {
    return setYear(value, count)
  }

  public date = (value?: any) => {
    //
    if (typeof value === 'undefined') {
      return new Date()
    }

    if (value === null) {
      return null
    }

    return new Date(value)
  }

  public dateWithTimezone = (value: string | null | undefined): Date | null => {
    return this.date(value)
  }

  public getTimezone = (): string => {
    return 'default'
  }

  public setTimezone = (value: Date): Date => {
    return value
  }

  public toJsDate = (value: Date) => {
    return value
  }

  public parse = (value: string, formatString: string) => {
    if (value === '') {
      return null
    }

    if (
      (formatString === 'dd/MM/yyyy' || formatString === 'P') &&
      value.length === 10
    ) {
      const year = parseInt(value.substring(6, 10))
      if (year > 543) {
        const newYear = year - 543
        const res = value.replace(`${year}`, `${newYear}`)
        return dateFnsParse(res, formatString, new Date(), {
          locale: this.locale,
        })
      } else {
        return dateFnsParse(value, formatString, new Date(), {
          locale: this.locale,
        })
      }
    }

    if (formatString === 'MM/yyyy' && value.length === 7) {
      const year = parseInt(value.substring(3, 7))
      if (year > 543) {
        const newYear = year - 543
        const res = value.replace(`${year}`, `${newYear}`)
        return dateFnsParse(res, formatString, new Date(), {
          locale: this.locale,
        })
      } else {
        return dateFnsParse(value, formatString, new Date(), {
          locale: this.locale,
        })
      }
    }
    if (formatString === 'yyyy' && value.length === 4) {
      const year = parseInt(value)
      if (year > 543) {
        const newYear = year - 543
        const res = value.replace(`${year}`, `${newYear}`)
        return dateFnsParse(res, formatString, new Date(), {
          locale: this.locale,
        })
      } else {
        return dateFnsParse(value, formatString, new Date(), {
          locale: this.locale,
        })
      }
    }
    if (formatString === 'MM' && value.length === 2) {
      return dateFnsParse(value, formatString, new Date(), {
        locale: this.locale,
      })
    }

    return null
    // return dateFnsParse(value, formatString, new Date(), { locale: this.locale });
  }

  public format = (date: Date, formatKey: keyof AdapterFormats) => {
    return this.formatByString(date, this.formats[formatKey])
  }

  public formatByString = (date: Date, formatString: string) => {
    const christianYear = `${getYear(date)}`
    const buddhishYear = (parseInt(christianYear) + 543).toString()
    const result = format(date, formatString, { locale: this.locale })

    return result.replace(christianYear, buddhishYear)
  }

  public isEqual = (date: any, comparing: any) => {
    if (date === null && comparing === null) {
      return true
    }

    return isEqual(date, comparing)
  }

  public isNull = (date: Date) => {
    return date === null
  }

  public isAfterDay = (date: Date, value: Date) => {
    return isAfter(date, endOfDay(value))
  }

  public isBeforeDay = (date: Date, value: Date) => {
    return isBefore(date, startOfDay(value))
  }

  public isBeforeYear = (date: Date, value: Date) => {
    return isBefore(date, startOfYear(value))
  }

  public isAfterYear = (date: Date, value: Date) => {
    return isAfter(date, endOfYear(value))
  }

  public isWithinRange = (date: Date, [start, end]: [Date, Date]) => {
    return isWithinInterval(date, { start, end })
  }

  public formatNumber = (numberToFormat: string) => {
    return numberToFormat
  }

  public getMinutes = (date: Date) => {
    return date.getMinutes()
  }

  public getDate = (value: Date) => {
    return getDate(value)
  }

  public getMonth = (date: Date) => {
    return date.getMonth()
  }

  public getDaysInMonth = (date: Date) => {
    return getDaysInMonth(date)
  }

  public setMonth = (date: Date, count: number) => {
    return setMonth(date, count)
  }

  public setDate = (value: Date, date: number) => {
    return setDate(value, date)
  }

  public getMeridiemText = (ampm: 'am' | 'pm') => {
    return ampm === 'am' ? 'AM' : 'PM'
  }

  public getNextMonth = (date: Date) => {
    return addMonths(date, 1)
  }

  public getPreviousMonth = (date: Date) => {
    return addMonths(date, -1)
  }

  public getMonthArray = (date: Date) => {
    const firstMonth = startOfYear(date)
    const monthArray = [firstMonth]

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1]
      monthArray.push(this.getNextMonth(prevMonth))
    }

    return monthArray
  }

  public mergeDateAndTime = (date: Date, time: Date) => {
    return this.setSeconds(
      this.setMinutes(
        this.setHours(date, this.getHours(time)),
        this.getMinutes(time),
      ),
      this.getSeconds(time),
    )
  }

  public getWeekdays = () => {
    const now = new Date()
    return eachDayOfInterval({
      start: startOfWeek(now, { locale: this.locale }),
      end: endOfWeek(now, { locale: this.locale }),
    }).map((day) => this.formatByString(day, 'EEEEEE'))
  }

  public getWeekArray = (date: Date) => {
    const start = startOfWeek(startOfMonth(date), { locale: this.locale })
    const end = endOfWeek(endOfMonth(date), { locale: this.locale })

    let count = 0
    let current = start
    const nestedWeeks: Date[][] = []
    let lastDay = null
    while (isBefore(current, end)) {
      const weekNumber = Math.floor(count / 7)
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || []
      const day = getDay(current)
      if (lastDay !== day) {
        lastDay = day
        nestedWeeks[weekNumber].push(current)
        count += 1
      }
      current = addDays(current, 1)
    }
    return nestedWeeks
  }

  public getWeekNumber = (value: Date) => {
    return getWeek(value, { locale: this.locale })
  }

  public getYearRange = (start: Date, end: Date) => {
    const startDate = startOfYear(start)
    const endDate = endOfYear(end)
    const years: Date[] = []

    let current = startDate
    while (isBefore(current, endDate)) {
      years.push(current)
      current = addYears(current, 1)
    }

    return years
  }
}
