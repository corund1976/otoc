import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ton: 0,

  withdrawStatus: null,

  buyOtp: null,
  buyStatus: null,
}

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalanceTon: (state, action) => { state.ton = action.payload },

    setWithdrawStatus: (state, action) => { state.withdrawStatus = action.payload },

    setBuyOtp: (state, action) => { state.buyOtp = action.payload },
    setBuyStatus: (state, action) => { state.buyStatus = action.payload },

    resetBalance: () => initialState,
  },
})

export const {
  setBalanceTon,

  setWithdrawStatus,

  setBuyOtp,
  setBuyStatus,

  resetBalance,
} = balanceSlice.actions

export default balanceSlice.reducer
