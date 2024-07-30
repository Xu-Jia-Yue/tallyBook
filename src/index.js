import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router'
import store from './store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
