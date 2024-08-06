/* eslint-disable camelcase */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import WebApp from '@twa-dev/sdk';

import appSelectors from 'redux/app/appSelectors';
import authSelectors from 'redux/auth/authSelectors';

import { setScreenHeight, setScreenWidth } from 'redux/app/appSlice';

import userOperations from 'redux/user/userOperations';
import authOperations from 'redux/auth/authOperations';

import Router from 'router';

import LoaderSpinner from 'components/loaderSpinner';
import TonConnect from 'components/tonConnect';

Notify.init({
  borderRadius: '12px',
  fontFamily: 'Montserrat',
  fontSize: '12px',
  timeout: 5000,
  useIcon: false,
  success: {
    background: '#22232b',
    textColor: '#787e95',
  },
  failure: {
    background: '#22232b',
    textColor: '#787e95',
  },
  warning: {
    background: '#22232b',
    textColor: '#787e95',
  },
});

function App() {
  const dispatch = useDispatch();
  const displayLoader = useSelector(appSelectors.displayLoader);
  const displayModal = useSelector(appSelectors.displayModal);
  const isAuthorized = useSelector(authSelectors.isAuthorized);

  // Запрет скролла при открытии меню/модалки
  useEffect(() => {
    if (displayLoader || displayModal) {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = 'fixed';
    } else {
      const scrolly = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, Number.parseInt(scrolly || '0', 10) * -1);
    }
  }, [displayLoader, displayModal]);

  useEffect(() => {
    const handleResize = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--window-height', `${window.innerHeight}px`);
      doc.style.setProperty('--window-width', `${window.innerWidth}px`);

      dispatch(setScreenWidth(window.innerWidth));
      dispatch(setScreenHeight(window.innerHeight));
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
      const { id } = WebApp.initDataUnsafe.user;
      dispatch(authOperations.login({ id }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthorized) dispatch(userOperations.getUser());
  }, [dispatch, isAuthorized]);

  return (
    <>
      <Router />
      {displayLoader && <LoaderSpinner />}
      <TonConnect />
    </>
  );
}

export default App;
