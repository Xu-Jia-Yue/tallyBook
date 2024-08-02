import dayjs from 'dayjs'
import './index.scss'
import classNames from 'classnames'
import { billTypeToName } from '@/contants/toggleType'
import { useState } from 'react'
import BillIcon from '@/components/BillIcon'
import PayAndIncomeItem from '@/components/PayAndIncomeItem'
import useMoneyCount from '@/hooks/useMoneyCount'

const DailyBill = ({ date, billList }) => {
  const [billListFlag, setbillListFlag] = useState(false)
  // 计算每日结果
  const dayResult = useMoneyCount(billList)
  return (
    <div className={classNames('dailyBill')}>
      <div className='header' onClick={() => setbillListFlag(!billListFlag)}>
        <div className='dateIcon'>
          <span className='date'>{dayjs(date).format('MM月DD日')}</span>
          <span className={billListFlag ? 'arrow expand' : 'arrow'}></span>
        </div>
        <PayAndIncomeItem pay={dayResult.pay} income={dayResult.income} />
      </div>
      {/* 单日列表 */}
      <div
        className='billList'
        style={{ display: billListFlag ? 'block' : 'none' }}
      >
        {billList.map((item) => {
          return (
            <div className='bill' key={item.id}>
              <div className='detail'>
                <BillIcon type={item.useFor} />
                <div className='billType'>{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill
