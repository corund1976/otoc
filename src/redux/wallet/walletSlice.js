import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isConnected: false,
  walletData: null,

  addressFriendly: '',
  addressRaw: '',

  txHash: ''
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletIsConnected: (state, action) => { state.isConnected = action.payload },
    setWalletData: (state, action) => { state.walletData = action.payload },

    setWalletAddressFriendly: (state, action) => { state.addressFriendly = action.payload },
    setWalletAddressRaw: (state, action) => { state.addressRaw = action.payload },

    setWalletTxHash: (state, action) => { state.txHash = action.payload },

    resetWallet: () => initialState,
  },
})

export const {
  setWalletIsConnected,
  setWalletData,

  setWalletAddressFriendly,
  setWalletAddressRaw,

  setWalletTxHash,

  resetWallet,
} = walletSlice.actions

export default walletSlice.reducer
