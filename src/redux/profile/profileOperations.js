import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayLoader } from 'redux/app/appSlice';
import { setEventsHistory } from 'redux/profile/profileSlice';

import profileService from 'services/profileService';

const getEvetsHistory = () => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))
    const response = await profileService.getEvetsHistory()
    const { history } = response.data
    dispatch(setEventsHistory(history));
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request GetEvetsHistory failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

export default {
  getEvetsHistory,
}
