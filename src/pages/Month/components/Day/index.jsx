import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'
import { billTypeToName } from '@/contants/toggleType'
import { useMemo, useState } from 'react'
import BillIcon from '@/components/BillIcon'

const DailyBill = ({ date, billList }) => {
  // 对传来的单日账单进行日期排序
  // const newDate = date.sort((a, b) => {
  //   return Date.parse(a) - Date.parse(b)
  // })
  // console.log(newDate)
  const [billListFlag, setbillListFlag] = useState(false)
  // 计算每日结果
  const dayResult = useMemo(() => {
    // 支出 / 收入 / 结余
    const pay = billList
      ?.filter((item) => item.type === 'pay')
      ?.reduce((s, i) => s + i.money, 0)
    const income = billList
      ?.filter((item) => item.type === 'income')
      ?.reduce((s, i) => s + i.money, 0)
    const balance = income + pay
    return {
      pay,
      income,
      balance,
    }
  }, [billList])
  return (
    <div className={classNames('dailyBill')}>
      <div className='header' onClick={() => setbillListFlag(!billListFlag)}>
        <div className='dateIcon'>
          <span className='date'>{dayjs(date).format('MM月DD日')}</span>
          <span className={billListFlag ? 'arrow expand' : 'arrow'}></span>
        </div>
        <div className='oneLineOverview'>
          <div className='pay'>
            <span className='type'>支出</span>
            <span className='money'>{dayResult.pay}</span>
          </div>
          <div className='income'>
            <span className='type'>收入</span>
            <span className='money'>{dayResult.income}</span>
          </div>
          <div className='balance'>
            <span className='money'>{dayResult.balance}</span>
            <span className='type'>结余</span>
          </div>
        </div>
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
