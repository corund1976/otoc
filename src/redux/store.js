import { combineReducers, configureStore } from '@reduxjs/toolkit'

import appReducer from 'redux/app/appSlice'
import authReducer from 'redux/auth/authSlice'
import userReducer from 'redux/user/userSlice'
import balanceReducer from 'redux/balance/balanceSlice'
import lotteryReducer from 'redux/lottery/lotterySlice'
import friendsReducer from 'redux/friends/friendsSlice'
import profileReducer from 'redux/profile/profileSlice'
import walletReducer from 'redux/wallet/walletSlice'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  balance: balanceReducer,
  lottery: lotteryReducer,
  friends: friendsReducer,
  profile: profileReducer,
  wallet: walletReducer,
})


const customizedMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false })

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
  devTools: import.meta.env.VITE_NODE_ENV === 'development',
})

export default store