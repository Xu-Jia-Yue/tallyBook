import React, { useEffect } from 'react'
import { getBillData } from '@/store/module/BillStore'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Layout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillData())
  }, [dispatch])
  const { billList } = useSelector((state) => state.bill)
  console.log(billList)
  return (
    <div>
      <Outlet />
      <div>
        <Link to='/'>月度账单</Link>
        <Link to='/year'>年度账单</Link>
      </div>
    </div>
  )
}
