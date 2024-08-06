import $api from "axiosHttp/api";

const withdraw = async (data) => {
  const response = await $api.post('/api/v1/users/withdraw/', data);
  return response
}

const getBuyOtp = async () => {
  const response = await $api.post('/create-otp-code/');
  return response
}

const buy = async (data) => {
  const response = await $api.post('/buy-tickets/', data);
  return response
}

export default {
  withdraw,
  getBuyOtp,
  buy,
}