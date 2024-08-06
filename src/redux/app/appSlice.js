import { createSlice } from '@reduxjs/toolkit'
import WebApp from '@twa-dev/sdk';

const getLanguage = () => {
  const language = `${window?.localStorage?.getItem('otoc-twa-language')}`

  if (['EN', 'RU'].includes(language)) return language

  return 'EN'
}

const initialState = {
  screenHeight: 600,
  screenWidth: 1280,
  language: getLanguage(),

  platform: WebApp?.platform,
  version: WebApp?.version,

  displayLoader: false,
  displayModal: false,

  displayPrivacy: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setScreenHeight: (state, action) => { state.screenHeight = action.payload },
    setScreenWidth: (state, action) => { state.screenWidth = action.payload },
    setLanguage: (state, action) => { state.language = action.payload },

    setPlatform: (state, action) => { state.platform = action.payload },
    setVersion: (state, action) => { state.version = action.payload },

    setDisplayLoader: (state, action) => { state.displayLoader = action.payload },
    setDisplayModal: (state, action) => { state.displayModal = action.payload },

    setDisplayPrivacy: (state, action) => { state.displayPrivacy = action.payload },

    resetApp: () => initialState,
  }
})

export const {
  setScreenHeight,
  setScreenWidth,
  setLanguage,

  setPlatform,
  setVersion,

  setDisplayLoader,
  setDisplayModal,

  setDisplayPrivacy,

  resetApp,
} = appSlice.actions

export default appSlice.reducer
