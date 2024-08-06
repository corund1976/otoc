import $api from "axiosHttp/api";

const getUser = async () => {
  const response = await $api.post('/api/v1/users/user/');
  return response
}

const disablePrivacy = async () => {
  const response = await $api.post('/set-privacy/');
  return response
}

export default {
  getUser,
  disablePrivacy,
}