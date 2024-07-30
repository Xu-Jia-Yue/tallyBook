import { configureStore } from '@reduxjs/toolkit'
import billReducer from './module/BillStore'
const store = configureStore({
  reducer: {
    bill: billReducer,
  },
})
export default store
