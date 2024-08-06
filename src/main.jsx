import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import store from 'redux/store';

import App from './App.jsx';

import 'css/fonts.css';
import 'css/reset.css';
import 'css/variables.css';
import 'css/index.css';
import 'css/buttons.css';
import 'css/snippets.css';

const { WebApp } = window.Telegram;
WebApp.ready();
WebApp.expand();
WebApp.enableClosingConfirmation();
// WebApp.disableVerticalSwipes();
const bgColor = '#cb5050';
WebApp.setHeaderColor(bgColor);
WebApp.setBackgroundColor(bgColor);

Notify.init({
  timeout: 2000,
  width: '310px',
  position: 'center-top',
  borderRadius: '16px',
  fontFamily: 'Gilroy',
  fontSize: '14px',
  useFontAwesome: true,
  success: {
    background: '#2ABE5C',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: '#FFFFFF',
  },
  failure: {
    background: '#A81F1B',
    fontAwesomeClassName: 'fa fa-times-circle',
    fontAwesomeIconColor: '#FFFFFF',
  },
  warning: {
    background: '#ED9E27',
    fontAwesomeClassName: 'fa fa-info-circle',
    fontAwesomeIconColor: '#FFFFFF',
  },
});

const APP_URL = import.meta.env.VITE_APP_URL;
const manifestUrl = `${APP_URL}/tonconnect-manifest.json`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <App />
        </TonConnectUIProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
