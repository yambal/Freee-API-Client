type PartsObj = {
  day: string
  dayPeriod: string
  era: string
  fractionalSecond: string
  hour: string
  literal: string
  minute: string
  month: string
  relatedYear: string
  second: string
  timeZoneName: string
  weekday: string
  year: string
  yearName: string
}

const getParts = (date: Date, locale: string):Intl.DateTimeFormatPart[] => {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo"
  })
  return  formatter.formatToParts(date)
}

const getPartsObj = (date: Date, locale: string): PartsObj => {
  const parts = getParts(date, locale)

  const tmp: any = {}
  parts.forEach((part) => {
    tmp[part.type] = part.value 
  })

  const ret: PartsObj = tmp
  return ret
}

/**
 * Date から 2021-03-16 のようなStringに整形して返す
 * @param locale
 * @param date 
 * @returns 
 */
export const getDateString = (date: Date, locale?: string): string => {
  const partsObj = getPartsObj(date, locale || "Ja-jp")
  return `${partsObj.year}-${partsObj.month}-${partsObj.day}`
}

/**
 * YYYY-MM-DD HH:MM:SS : Date から 2021-03-16 22:37:27 のようなStringに整形して返す
 * @param locale
 * @param date 
 * @returns 
 */
export const getDateTimeString = (date: Date, locale?: string): string => {
  const partsObj = getPartsObj(date, locale || "Ja-jp")
  return `${partsObj.year}-${partsObj.month}-${partsObj.day} ${partsObj.hour}:${partsObj.minute}:${partsObj.second}`
}

/**
 * YYYY : Date から 2021 のような String に整形して返す
 * @param locale
 * @param date 
 * @returns 
 */
export const getYear = (date: Date, locale?: string): string => {
  const partsObj = getPartsObj(date, locale || "Ja-jp")
  return partsObj.year
}

/**
 * MM : Date から 03 のような String に整形して返す
 * @param locale
 * @param date 
 * @returns 
 */
export const getMonth = (date: Date, locale?: string): string => {
  const partsObj = getPartsObj(date, locale || "Ja-jp")
  return partsObj.month
}

const getElapsedMs = (a: Date, b:Date) => {
  return Math.round(Math.abs(a.getTime() - b.getTime()) / 1000 / 60)
}

/**
 * ミリ秒を経過時間として時間、分、秒で返す
 * @param milliseconds 
 * @returns 
 */
export const getElapsedTime = (milliseconds: number): {hours: number, minutes: number, seconds: number} => {
  const hours = Math.floor(milliseconds / 3600)
  const minutes = Math.floor((milliseconds - hours * 3600) / 60)
  const seconds = milliseconds - (hours * 3600) - (minutes * 60) 
  return {
    hours,
    minutes,
    seconds
  }
}

/**
 * ミリ秒を日本語の経過時間として返す
 * @param milliseconds 
 * @param hours 
 * @param minutes 
 * @param seconds 
 * @returns 
 */
export const getElapsedTimeJp = (milliseconds: number, hours: boolean = true, minutes: boolean = true, seconds: boolean = false) => {
  const elapsedTime = getElapsedTime(milliseconds)
  let res: string = ''
  if(elapsedTime.hours > 0 && hours){
    res += `${elapsedTime.hours}時間`
  }
  if(elapsedTime.minutes > 0 && seconds){
    res += `${elapsedTime.minutes}分`
  }
  if(elapsedTime.seconds > 0 && seconds){
    res += `${elapsedTime.seconds}秒`
  }
  return res
}

/**
 * 二つの時刻間の経過時間を日本語の経過時間として返す
 * @param a 
 * @param b 
 * @param hours 
 * @param minutes 
 * @param seconds 
 * @returns 
 */
export const getElapsedTimeJpDate = (a: Date, b:Date, hours: boolean = true, minutes: boolean = true, seconds: boolean = false) => {
  return getElapsedTimeJp(getElapsedMs(a,b), hours, minutes, seconds)
}