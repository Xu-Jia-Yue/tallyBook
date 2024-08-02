import { useState } from 'react'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isToday)

export const useDate = () => {
  const [date, setDate] = useState(() => dayjs().format('YYYY | MM'))
  const [visible, setVisible] = useState(false)
  const dayjsDate = dayjs(date)
  const dateText = dayjsDate.isToday() ? '今天' : dayjsDate.format('YYYY/MM/DD')
  const onShowDate = (flag) => setVisible(flag)
  const onHideDate = () => setVisible(false)
  const onDateChange = (val) => {
    setDate(val)
  }

  return {
    date,
    dateText,
    visible,
    onShowDate,
    onHideDate,
    onDateChange,
  }
}
