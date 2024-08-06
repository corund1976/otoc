/* eslint-disable no-param-reassign */
import axios from 'axios'

import authOperations from 'redux/auth/authOperations';

import store from 'redux/store'

const { dispatch, getState } = store; // direct access to redux store

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

const $api = axios.create()

$api.interceptors.request.use(
  async config => {
    const { auth: { accessToken } } = getState()
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  error => {
    throw error
  }
)

$api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      dispatch(authOperations.logout())
      return
    }

    throw error
  }
)

export default $api