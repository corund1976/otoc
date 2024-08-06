const isConnected = (state) => state.wallet.isConnected
const walletData = (state) => state.wallet.walletData

const addressFriendly = (state) => state.wallet.addressFriendly
const addressRaw = (state) => state.wallet.addressRaw

const txHash = (state) => state.wallet.txHash

export default {
  isConnected,
  walletData,

  addressFriendly,
  addressRaw,

  txHash,
}