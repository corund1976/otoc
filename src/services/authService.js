import $axios from "axiosHttp/axios";

const login = async (data) => {
  const response = await $axios.post('/api/v1/users/login/', data);
  return response
}

export default {
  login,
}