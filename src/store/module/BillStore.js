import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload
    },
  },
})
const { setBillList } = billStore.actions
// 异步获取账单列表
const getBillData = () => {
  return async (dispatch) => {
    const { data } = await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(data))
  }
}
const reducer = billStore.reducer
export { getBillData }
export default reducer
