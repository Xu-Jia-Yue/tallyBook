import { NavBar, DatePicker } from 'antd-mobile'
import dayjs from 'dayjs'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Day from './components/Day'

const Month = () => {
  // 切换日期的显示
  const [dateFlag, setDateFlag] = useState(false)
  // 格式化账单日期
  const [billDate, setBillDate] = useState(() => dayjs().format('YYYY | MM'))
  // 保存格式化后的月份
  const [currenMonthList, setMonthList] = useState([])

  // 按月分组
  const { billList } = useSelector((state) => state.bill)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY | MM'))
  }, [billList])

  // 初始化每月计算结果
  useEffect(() => {
    setMonthList(monthGroup[billDate] || [])
  }, [monthGroup, billDate])

  // 切换日期确定
  const confirmDate = (v) => {
    const dateFormat = dayjs(v).format('YYYY | MM')
    setBillDate(dateFormat)
    setMonthList(monthGroup[dateFormat] || [])
  }

  // 计算每月结果
  const monthResult = useMemo(() => {
    // 支出 / 收入 / 结余
    const pay = currenMonthList
      .filter((item) => item.type === 'pay')
      .reduce((s, i) => s + i.money, 0)
    const income = currenMonthList
      .filter((item) => item.type === 'income')
      .reduce((s, i) => s + i.money, 0)
    const balance = income + pay
    return {
      pay,
      income,
      balance,
    }
  }, [currenMonthList])

  // 按日分组
  const dayGroup = useMemo(() => {
    const group = _.groupBy(currenMonthList, (item) =>
      dayjs(item.date).format('YYYY-MM-DD')
    )
    const keys = Object.keys(group)
    return {
      group,
      keys,
    }
  }, [currenMonthList])
  return (
    <div className='monthlyBill'>
      <NavBar className='nav' backArrow={false}>
        月度收支
      </NavBar>
      <div className='content'>
        <div className='header'>
          {/* 时间切换区域 */}
          <div className='date' onClick={() => setDateFlag(true)}>
            <span className='text'>{billDate}月账单</span>
            <span className={dateFlag ? 'arrow expand' : 'arrow'}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className='item'>
              <span className='money'>{monthResult.pay}</span>
              <span className='type'>支出</span>
            </div>
            <div className='item'>
              <span className='money'>{monthResult.income}</span>
              <span className='type'>收入</span>
            </div>
            <div className='item'>
              <span className='money'>{monthResult.balance}</span>
              <span className='type'>结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className='kaDate'
            title='记账日期'
            precision='month'
            visible={dateFlag}
            max={new Date()}
            onConfirm={(val) => confirmDate(val)}
            onClose={() => {
              setDateFlag(false)
            }}
          />
        </div>
        {/* 渲染日账单组件 */}
        {dayGroup.keys.map((key) => {
          return <Day date={key} billList={dayGroup.group[key]} key={key} />
        })}
      </div>
    </div>
  )
}

export default Month
