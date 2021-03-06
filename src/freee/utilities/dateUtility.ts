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

/**
 * 現在と同日の場合は日付を日付を付けない
 * @param date 
 * @param locale 
 * @returns 
 */
export const getReadableTime = (date: Date, locale?: string): string => {
  const partsObj = getPartsObj(date, locale || "Ja-jp")
  if(getDateString(date) === getDateString(new Date())) {
    return `${partsObj.hour}:${partsObj.minute}:${partsObj.second}`
  }
  return `${partsObj.year}-${partsObj.month}-${partsObj.day} ${partsObj.hour}:${partsObj.minute}:${partsObj.second}`
}


const getElapsedMilliseconds = (a: Date, b:Date) => {
  return Math.round(Math.abs(a.getTime() - b.getTime()))
}

/**
 * ミリ秒を経過時間として時間、分、秒で返す
 * @param milliseconds 
 * @returns 
 */
export const getElapsedTime = (milliseconds: number): {hours: number, minutes: number, seconds: number} => {
  const sec = Math.round(milliseconds / 1000)
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec - hours * 3600) / 60)
  const seconds = sec - (hours * 3600) - (minutes * 60) 
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
export const getElapsedTimeJp = (milliseconds: number, hours: boolean = true, minutes: boolean = true, seconds: boolean = false, noneThen: string = "なし") => {
  const elapsedTime = getElapsedTime(milliseconds)
  let res: string = ''
  if(elapsedTime.hours > 0 && hours){
    res += `${elapsedTime.hours}時間`
  }
  if(elapsedTime.minutes > 0 && minutes){
    res += `${elapsedTime.minutes}分`
  }
  if(elapsedTime.seconds > 0 && seconds){
    res += `${elapsedTime.seconds}秒`
  }
  if(res.length === 0){
    return noneThen
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
export const getElapsedTimeJpDate = (a: Date, b:Date, hours: boolean = true, minutes: boolean = true, seconds: boolean = false, noneThen: string = "なし") => {
  return getElapsedTimeJp(getElapsedMilliseconds(a,b), hours, minutes, seconds, noneThen)
}