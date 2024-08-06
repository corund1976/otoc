/* eslint-disable camelcase */
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayLoader, setDisplayPrivacy } from 'redux/app/appSlice';
import {
  setUserId,
  setUserEmail,
  setUserName,
  setUserReflink,
  resetUser,
} from 'redux/user/userSlice';
import { setBalanceTon } from 'redux/balance/balanceSlice';
import {
  setTotalPurchasedTicket,
  setTotalWinTon,
} from 'redux/profile/profileSlice';

import authOperations from 'redux/auth/authOperations';

import userService from 'services/userService';

const TELEGRAM_BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;

const getUser = () => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await userService.getUser()

    const {
      is_active,
      // eslint-disable-next-line no-unused-vars
      id, telegram_id, email, telegram_username, first_name,
      ref_code,
      balance,
      amount_win, tickets_purchased,
      is_show_privacy
    } = response.data.user

    if (!is_active) {
      dispatch(authOperations.logout())
      return
    }

    dispatch(setUserId(id))
    dispatch(setUserEmail(email))
    dispatch(setUserName(telegram_username))
    dispatch(setUserReflink(`https://t.me/${TELEGRAM_BOT_USERNAME}/?start=referal_code-${ref_code}`))

    dispatch(setBalanceTon(balance || 0))

    dispatch(setTotalWinTon(amount_win || 0))
    dispatch(setTotalPurchasedTicket(tickets_purchased || 0))

    if (is_show_privacy) dispatch(setDisplayPrivacy(is_show_privacy))
  } catch (e) {
    if (e.response?.status === 429) {
      Notify.failure('Too much requests - try later ...')
      dispatch(resetUser())
      return
    }

    // Notify.failure(e.response?.data?.message || 'Request GetUser failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const disablePrivacy = async () => {
  try {
    await userService.disablePrivacy()
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request DisablePrivacy failure')
  }
}

export default {
  getUser,
  disablePrivacy,
}
