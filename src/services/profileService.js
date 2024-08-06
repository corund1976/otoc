import $api from "axiosHttp/api";

const getEvetsHistory = async () => {
  const response = await $api.get('/api/v1/users/history/');
  return response
}

export default {
  getEvetsHistory,
}