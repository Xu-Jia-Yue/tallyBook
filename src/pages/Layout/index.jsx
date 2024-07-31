import React, { useEffect } from 'react'
import { getBillData } from '@/store/module/BillStore'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './index.scss'
// 引入antd的tabbar
import { TabBar } from 'antd-mobile'
// 引入antd的图标
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from 'antd-mobile-icons'

// 底部导航图标数据
const tabs = [
  {
    key: '/month',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]
export default function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getBillData())
  }, [dispatch])
  // 切换路由
  const switchRouter = (path) => {
    if (path === '/month') {
      navigate('/')
    } else {
      navigate(path)
    }
  }
  return (
    <div className='layout'>
      <div className='container'>
        <Outlet />
      </div>
      <div className='footer'>
        <TabBar onChange={switchRouter}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}
