import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import appSelectors from 'redux/app/appSelectors';

import { setDisplayModal, setDisplayPrivacy } from 'redux/app/appSlice';

import userOperations from 'redux/user/userOperations';

import useOutsideClick from 'hooks/useOutsideClick';

import Backdrop from 'components/backdrop';

import s from './modalPrivacy.module.css';

function ModalPrivacy() {
  const dispatch = useDispatch();
  const displayPrivacy = useSelector(appSelectors.displayPrivacy);

  const modalRef = useRef();

  const closeModal = () => {
    userOperations.disablePrivacy();

    dispatch(setDisplayPrivacy(false));
    dispatch(setDisplayModal(false));
  };

  useEffect(() => {
    dispatch(setDisplayModal(true));
  }, [dispatch]);

  useOutsideClick(modalRef, closeModal);

  const modalStyles = displayPrivacy ? s.modal : s.modal_hidden;

  return (
    <Backdrop>
      <div className={modalStyles} ref={modalRef}>
        <div className={s.container}>
          <p className={s.title}>Privacy policy</p>
          <p className={s.text}>
            Please read our{' '}
            <a
              href="https://telegra.ph/PRIVACY-POLICY-08-05-33"
              target="_blank"
              rel="noopener noreferrer"
            >
              privacy policy
            </a>
            . By clicking the button below, you confirm that you agree with the
            policy.
          </p>
          <button type="button" onClick={closeModal} className={s.btn_ok}>
            Let`s go
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

export default ModalPrivacy;
