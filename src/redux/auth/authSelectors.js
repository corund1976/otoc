const accessToken = (state) => state.auth.accessToken
const isAuthorized = (state) => state.auth.isAuthorized

export default {
  accessToken,
  isAuthorized,
}