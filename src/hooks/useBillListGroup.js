import { useSelector } from 'react-redux'
import _ from 'lodash'
import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'

export const useBillListGroup = (
  formatType,
  DateList,
  setDateList,
  date,
  setDate,
  dayOrMonth
) => {
  // 获取store中bill数据
  const { billList } = useSelector((state) => state.bill)
  // 将对象以 参数 为属性值分组
  const typeGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format(formatType))
  }, [billList, formatType])

  // 初始化
  useEffect(() => {
    setDateList(typeGroup[date] || [])
  }, [date, typeGroup,setDateList])

  // 按日/月分组
  const monthOrdayGroup = useMemo(() => {
    const group = _.groupBy(DateList, (item) =>
      dayjs(item.date).format(dayOrMonth)
    )
    const keys = Object.keys(group)
    return {
      group,
      keys,
    }
  }, [DateList, dayOrMonth])

  const confirmDate = (v) => {
    const dateFormat = dayjs(v).format(formatType)
    setDate(dateFormat)
    setDateList(typeGroup[dateFormat] || [])
  }
  // 返回数据
  return {
    monthOrdayGroup,
    confirmDate,
  }
}
