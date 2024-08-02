import './index.scss'
import { useState } from 'react'
import { NavBar, DatePicker } from 'antd-mobile'
import PayAndIncomNav from '@/components/PayAndIncomeNav'
import Day from './components/Day'
import { useDate } from '@/hooks/useDate'
import useMoneyCount from '@/hooks/useMoneyCount'
import { useBillListGroup } from '@/hooks/useBillListGroup'

const Month = () => {
  const { visible, onShowDate, date, onDateChange } = useDate()
  // 保存格式化后的月份
  const [currenMonthList, setMonthList] = useState([])
  const { confirmDate, monthOrdayGroup } = useBillListGroup(
    'YYYY | MM',
    currenMonthList,
    setMonthList,
    date,
    onDateChange,
    'YYYY-MM-DD'
  )
  // 年度收支
  const monthResult = useMoneyCount(currenMonthList)

  return (
    <div className='monthlyBill'>
      <NavBar className='nav' backIcon={false}>
        月度收支
      </NavBar>
      <div className='content'>
        <div className='header'>
          {/* 时间切换区域 */}
          <div className='date' onClick={() => onShowDate(true)}>
            <span className='text'>{date}月账单</span>
            <span className={visible ? 'arrow expand' : 'arrow'}></span>
          </div>
          {/* 统计区域 */}
          <PayAndIncomNav pay={monthResult.pay} income={monthResult.income} />
          {/* 时间选择器 */}
          <DatePicker
            className='kaDate'
            title='记账日期'
            precision='month'
            visible={visible}
            max={new Date()}
            onConfirm={(val) => confirmDate(val)}
            onClose={() => {
              onShowDate(false)
            }}
          />
        </div>
        {/* 渲染日账单组件 */}
        {monthOrdayGroup.keys.map((key) => {
          return (
            <Day date={key} billList={monthOrdayGroup.group[key]} key={key} />
          )
        })}
      </div>
    </div>
  )
}

export default Month
