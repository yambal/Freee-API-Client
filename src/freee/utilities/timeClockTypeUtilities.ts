import { TimeClockType, TimeClockTypeLabel, TimeClockTypeWithLabel } from '../hr/hrTypes'

const typeToLabel = (type: TimeClockType):TimeClockTypeLabel| undefined => {
  switch(type){
    case 'clock_in':
      return '出勤'
    case 'break_begin':
      return '休憩開始'
    case 'break_end':
      return '休憩終了'
    case 'clock_out':
      return '退勤'
    default:
      return undefined
  }
}

export const typeToTimeClockType = (type: TimeClockType): TimeClockTypeWithLabel | undefined => {
  const label = typeToLabel(type)
  if(label){
    return {
      type,
      label
    }
  }
  return undefined
}