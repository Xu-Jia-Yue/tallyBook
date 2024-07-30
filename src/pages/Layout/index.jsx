import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
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
