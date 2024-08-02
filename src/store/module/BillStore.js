import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const billStore = createSlice({
  name: 'bill',
  initialState: {
    // 2021: [{ type, date, money, useFor }]
    //  type: 'pay' | 'income'
    // 2022: [{ type, date, money, useFor }]
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      const newD = action.payload.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date)
      })
      state.billList = newD
    },
    addBill(state, action) {
      state.billList.unshift(action.payload)
    },
  },
})
const { setBillList, addBill } = billStore.actions
// 异步获取账单列表
const getBillData = () => {
  return async (dispatch) => {
    const { data } = await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(data))
  }
}
// 异步添加数据
const addBillAsync = (data) => {
  return async (dispatch) => {
    const res = await axios.post('http://localhost:8888/ka', data)
    dispatch(addBill(res.data))
  }
}

const reducer = billStore.reducer
export { getBillData, addBillAsync }
export default reducer
