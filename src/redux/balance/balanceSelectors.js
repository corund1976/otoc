const ton = (state) => state.balance.ton

const withdrawStatus = (state) => state.balance.withdrawStatus

const buyOtp = (state) => state.balance.buyOtp
const buyStatus = (state) => state.balance.buyStatus

export default {
  ton,

  withdrawStatus,

  buyOtp,
  buyStatus,
}