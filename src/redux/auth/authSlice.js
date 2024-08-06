import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // accessToken:
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMiwiZXhwIjoxNzIyOTEzODI2LCJpYXQiOjE3MjI4NzA2MjZ9.gvBMXmPfttpu9ie3bZ4tqNWjUR0wHMq2uZpisbVMiV4",
  // isAuthorized: true,
  accessToken: null,
  isAuthorized: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => { state.accessToken = action.payload },
    setAuthorized: (state, action) => { state.isAuthorized = action.payload },

    resetAuth: () => initialState,
  },
})

export const {
  setAccessToken,
  setAuthorized,

  resetAuth,
} = authSlice.actions

export default authSlice.reducer