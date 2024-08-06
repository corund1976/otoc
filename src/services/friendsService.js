import $api from "axiosHttp/api";

const getFriendsList = async () => {
  const response = await $api.post('/get-partners/');
  return response
}

export default {
  getFriendsList,
}