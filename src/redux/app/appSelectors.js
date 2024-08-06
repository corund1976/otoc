const screenHeight = (state) => state.app.screenHeight
const screenWidth = (state) => state.app.screenWidth
const language = (state) => state.app.language

const platform = (state) => state.app.platform
const version = (state) => state.app.version

const displayLoader = (state) => state.app.displayLoader
const displayModal = (state) => state.app.displayModal

const displayPrivacy = (state) => state.app.displayPrivacy

export default {
  screenHeight,
  screenWidth,
  language,

  platform,
  version,

  displayLoader,
  displayModal,

  displayPrivacy,
}