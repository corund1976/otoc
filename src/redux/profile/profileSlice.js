import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalWinTon: 0,
  totalPurchasedTicket: 0,

  eventsHistory: null,

}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setTotalWinTon: (state, action) => { state.totalWinTon = action.payload },
    setTotalPurchasedTicket: (state, action) => { state.totalPurchasedTicket = action.payload },

    setEventsHistory: (state, action) => { state.eventsHistory = action.payload },

    resetProfile: () => initialState,
  },
})

export const {
  setTotalWinTon,
  setTotalPurchasedTicket,

  setEventsHistory,

  resetProfile,
} = profileSlice.actions

export default profileSlice.reducer
