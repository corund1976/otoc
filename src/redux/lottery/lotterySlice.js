import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const lotterySlice = createSlice({
  name: 'lottery',
  initialState,
  reducers: {
    setLotteryData: (state, action) => { state.data = action.payload },

    resetLottery: () => initialState,
  },
})

export const {
  setLotteryData,

  resetLottery,
} = lotterySlice.actions

export default lotterySlice.reducer
