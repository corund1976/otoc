import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayLoader } from 'redux/app/appSlice';
import { setLotteryData } from 'redux/lottery/lotterySlice';

import lotteryService from 'services/lotteryService';

const getLotteryData = (lotteryName) => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await lotteryService.getLotteryData(lotteryName)
    const { result } = response.data

    dispatch(setLotteryData(result));
  } catch (e) {
    console.log(e);
    if (e.response.status === 400) {
      dispatch(setLotteryData(null));
      return
    }

    Notify.failure(e.response?.data?.message || 'Request GetLotteryData failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

export default {
  getLotteryData,
}
