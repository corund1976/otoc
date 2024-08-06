/* eslint-disable camelcase */
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayLoader } from 'redux/app/appSlice';
import { setFriendsList, setFriendsReward } from 'redux/friends/friendsSlice';

import friendsService from 'services/friendsService';

const getFriendsList = () => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await friendsService.getFriendsList()
    const { partners, received } = response.data

    dispatch(setFriendsList(partners));
    dispatch(setFriendsReward(received))
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request GetFriendsList failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

export default {
  getFriendsList,
}
