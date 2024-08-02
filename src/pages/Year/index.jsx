import { DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import './index.scss'
import MoneyCount from '@/hooks/useMoneyCount'
import PayAndIncomeNav from '@/components/PayAndIncomeNav'
import PayAndIncomeItem from '@/components/PayAndIncomeItem'
import { useState } from 'react'
import { useBillListGroup } from '@/hooks/useBillListGroup'

const BillAll = () => {
  const [visible, setVisible] = useState(false)
  const [year, setYear] = useState(2024)
  // 保存格式化后的年份
  const [currenYearList, setYearList] = useState([])
  // 调用方法获取以 YYYY 分组的数组
  const { confirmDate, monthOrdayGroup } = useBillListGroup(
    'YYYY', 
    currenYearList,
    setYearList,
    year,
    setYear,
    'MM'
  )
  // 年度收支
  const yearCount = MoneyCount(currenYearList)
  return (
    <div className='billDetail'>
      <NavBar className='nav' backIcon={false}>
        <div className='nav-title' onClick={() => setVisible(true)}>
          {year}年
          <span className={classNames('arrow', visible && 'expand')}></span>
        </div>
      </NavBar>
      <DatePicker
        className='kaDate'
        title='记账日期'
        precision='year'
        visible={visible}
        onClose={() => setVisible(false)}
        max={new Date()}
        onConfirm={(e) => confirmDate(e)}
      />

      <div className='content'>
        <div className='overview'>
          <PayAndIncomeNav
            pay={yearCount.pay}
            income={yearCount.income}
            className='overview'
          />
        </div>
        {monthOrdayGroup.keys.map((item) => {
          const { pay, income } = MoneyCount(monthOrdayGroup.group[item])
          return (
            <div className='monthBill' key={item}>
              <div className='date'>{item}月</div>
              <PayAndIncomeItem pay={pay} income={income} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BillAll
