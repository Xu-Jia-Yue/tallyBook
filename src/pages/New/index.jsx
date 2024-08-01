import { Button, DatePicker, Input, NavBar ,Modal} from 'antd-mobile'
import Icon from '@/components/BillIcon'
import './index.scss'
import dayjs from 'dayjs'
import { billListData } from '@/contants/toggleType'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillAsync } from '@/store/module/BillStore'
import { useDispatch } from 'react-redux'

const New = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [billType, setbillType] = useState('pay')
  const [money, setmoney] = useState()
  const [iconSelected, setIncoSelected] = useState()
  const [billDate, setBillDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [visible, setVisible] = useState(false)
  const confirmDate = (v) => {
    setBillDate(dayjs(v).format('YYYY-MM-DD'))
  }
  const saveBill = () => {
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date: billDate,
      useFor: iconSelected,
    }
    if (money && iconSelected) {
      dispatch(addBillAsync(data))
    } else {
      Modal.alert({
        content: '请输入完整数据'
      })
    }
    setIncoSelected('')
    setmoney('')
  }
  return (
    <div className='keepAccounts'>
      <NavBar className='nav' onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className='header'>
        <div className='kaType'>
          <Button
            shape='rounded'
            className={billType === 'pay' ? 'selected' : ''}
            onClick={() => setbillType('pay')}
          >
            支出
          </Button>
          <Button
            className={billType === 'income' ? 'selected' : ''}
            onClick={() => setbillType('income')}
            shape='rounded'
          >
            收入
          </Button>
        </div>

        <div className='kaFormWrapper'>
          <div className='kaForm'>
            <div className='date'>
              <Icon type='calendar' className='icon' />
              <span className='text' onClick={() => setVisible(true)}>
                {billDate === dayjs().format('YYYY-MM-DD')
                  ? '今天'
                  : dayjs().format('YYYY-MM-DD')}
              </span>
              <DatePicker
                className='kaDate'
                title='记账日期'
                visible={visible}
                onClose={() => {
                  setVisible(false)
                }}
                onConfirm={(val) => confirmDate(val)}
                max={new Date()}
              />
            </div>
            <div className='kaInput'>
              <Input
                className='input'
                placeholder='0.00'
                type='number'
                value={money}
                onChange={(e) => {
                  setmoney(e)
                }}
                max={99999099999}
              />
              <span className='iconYuan'>¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className='kaTypeList'>
        {/* 展示区 */}
        {billListData[billType].map((item) => {
          return (
            <div className='kaType' key={item.type}>
              <div className='title'>{item.name}</div>
              <div className='list'>
                {item.list.map((item) => {
                  return (
                    <div
                      className={
                        iconSelected === item.type ? 'item selected' : 'item'
                      }
                      key={item.type}
                      onClick={() => setIncoSelected(item.type)}
                    >
                      <div className='icon'>
                        <Icon type={item.type} />
                      </div>
                      <div className='text'>{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className='btns'>
        <Button className='btn save' onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New
