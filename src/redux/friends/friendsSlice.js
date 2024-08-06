import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: null,
  reward: 0,
}

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriendsList: (state, action) => { state.list = action.payload },
    setFriendsReward: (state, action) => { state.reward = action.payload },

    resetFriends: () => initialState,
  },
})

export const {
  setFriendsList,
  setFriendsReward,

  resetFriends,
} = friendsSlice.actions

export default friendsSlice.reducer
