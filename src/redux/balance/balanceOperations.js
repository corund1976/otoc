/* eslint-disable camelcase */
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayLoader } from 'redux/app/appSlice';
import { setBuyOtp, setBuyStatus, setWithdrawStatus } from 'redux/balance/balanceSlice';

import userOperations from 'redux/user/userOperations';

import balanceService from 'services/balanceService';

const withdraw = (data) => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    await balanceService.withdraw(data)

    dispatch(setWithdrawStatus('success'));

    dispatch(userOperations.getUser())
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request Withdraw failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const getBuyOtp = () => async dispatch => {
  try {
    const response = await balanceService.getBuyOtp()
    const { code } = response.data
    console.log(response);

    dispatch(setBuyOtp(code));
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request GetBuyOtp failure')
  }
}

const buy = (data) => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    await balanceService.buy(data)

    dispatch(setBuyStatus('success'));

    dispatch(userOperations.getUser())
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request Buy failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

export default {
  withdraw,
  getBuyOtp,
  buy,
}
