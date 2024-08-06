import $api from "axiosHttp/api";

// const URL = {
//   "daily": '/daily/',
//   "special": '/special/',
//   "monthly": '/monthly/',
// }

const getLotteryData = async (lotteryName) => {
  const response = await $api.post(`/${lotteryName}/`);
  return response
}

export default {
  getLotteryData,
}