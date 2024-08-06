import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 0,
  email: '',
  name: '',
  refLink: ``,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => { state.id = action.payload },
    setUserEmail: (state, action) => { state.email = action.payload },
    setUserName: (state, action) => { state.name = action.payload },
    setUserReflink: (state, action) => { state.refLink = action.payload },

    resetUser: () => initialState,
  },
})

export const {
  setUserId,
  setUserEmail,
  setUserName,
  setUserReflink,

  resetUser,
} = userSlice.actions

export default userSlice.reducer
