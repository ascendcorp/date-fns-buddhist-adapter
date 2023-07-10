import { th } from 'date-fns/locale'
import AdapterDateFns from '..'
import { AdapterFormats } from '../models'

describe('AdapterDateFns', () => {
  describe('Default locale', () => {
    const adapter = new AdapterDateFns()
    let date: Date
    beforeEach(() => {
      date = adapter.date('2023-06-09T23:44:00.000Z') as Date
    })

    it('getWeekdays: should start on Sunday', () => {
      const result = adapter.getWeekdays()
      expect(result).toStrictEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])
    })

    it('getWeekArray: should start on Sunday', () => {
      const result = adapter.getWeekArray(date)
      expect(adapter.formatByString(result[0][0], 'EEEEEE')).toEqual('Su')
    })

    it('is12HourCycleInCurrentLocale: should have meridiem', () => {
      expect(adapter.is12HourCycleInCurrentLocale()).toEqual(true)
    })

    it('should formatting correctly', () => {
      const expectDate = (format: keyof AdapterFormats, expected: string) => {
        expect(adapter.format(date, format)).toEqual(expected)
      }

      expectDate('fullDate', 'Jun 10, 2566')
      expectDate('fullDateWithWeekday', 'Saturday, June 10th, 2566')
      expectDate('fullDateTime', 'Jun 10, 2566 6:44 AM')
      expectDate('fullDateTime12h', 'Jun 10, 2566 06:44 am')
      expectDate('fullDateTime24h', 'Jun 10, 2566 06:44')
      expectDate('keyboardDate', '06/10/2566')
      expectDate('keyboardDateTime', '06/10/2566 6:44 AM')
      expectDate('keyboardDateTime12h', '06/10/2566 06:44 am')
      expectDate('keyboardDateTime24h', '06/10/2566 06:44')
    })
  })

  describe('TH locale', () => {
    const adapter = new AdapterDateFns({ locale: th as never })
    let date: Date
    beforeEach(() => {
      date = adapter.date('2023-06-09T23:44:00.000Z') as Date
    })

    it('getWeekdays: should start on วันอาทิตย์', () => {
      const result = adapter.getWeekdays()
      expect(result).toStrictEqual(['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'])
    })

    it('getWeekArray: should start on วันอาทิตย์', () => {
      const result = adapter.getWeekArray(date)
      expect(adapter.formatByString(result[0][0], 'EEEEEE')).toEqual('อา.')
    })

    it('is12HourCycleInCurrentLocale: should have not meridiem', () => {
      expect(adapter.is12HourCycleInCurrentLocale()).toEqual(false)
    })

    it('should formatting correctly', () => {
      const expectDate = (format: keyof AdapterFormats, expected: string) => {
        expect(adapter.format(date, format)).toEqual(expected)
      }

      expectDate('fullDate', '10 มิ.ย. 2566')
      expectDate('fullDateWithWeekday', 'วันเสาร์ที่ 10 มิถุนายน 2566')
      expectDate('fullDateTime', '10 มิ.ย. 2566 6:44 น.')
      expectDate('fullDateTime12h', '10 มิ.ย. 2566 06:44 ก่อนเที่ยง')
      expectDate('fullDateTime24h', '10 มิ.ย. 2566 06:44')
      expectDate('keyboardDate', '10/06/2566')
      expectDate('keyboardDateTime', '10/06/2566 6:44 น.')
      expectDate('keyboardDateTime12h', '10/06/2566 06:44 ก่อนเที่ยง')
      expectDate('keyboardDateTime24h', '10/06/2566 06:44')
    })
  })
})
