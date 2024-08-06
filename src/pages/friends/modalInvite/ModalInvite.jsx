import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import WebApp from '@twa-dev/sdk';

import userSelectors from 'redux/user/userSelectors';

import { setDisplayModal } from 'redux/app/appSlice';

import useOutsideClick from 'hooks/useOutsideClick';
import useSwipeDetection from 'hooks/useSwipe';

import Backdrop from 'components/backdrop';

import s from './modalInvite.module.css';

function ModalInvite({ close }) {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.user);

  const modalRef = useRef();

  const [displayInvite, setDisplayInvite] = useState(false);

  const closeModal = () => {
    dispatch(setDisplayModal(false));
    setDisplayInvite(false);
    close();
  };

  const copyReflink = () => {
    if (user?.refLink) {
      Notify.success('Invite message copied!');
      navigator.clipboard.writeText(user.refLink);
    }
  };

  const inviteFriends = () => {
    if (user?.refLink) {
      const url = user.refLink;
      const text = `🎰 Take part in the lottery every day 
                                                                                        
      📈 and get a prize!`;
      WebApp.openTelegramLink(`https://t.me/share/url?url=${url}&text=${text}`);
    }
  };

  const { swipeVertical } = useSwipeDetection(displayInvite);

  useEffect(() => {
    dispatch(setDisplayModal(true));
    setDisplayInvite(true);
  }, [dispatch]);

  useEffect(() => {
    if (swipeVertical === 'down') closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swipeVertical]);

  useOutsideClick(modalRef, closeModal, displayInvite);

  const modalStyles = displayInvite ? s.modal : s.modal_hidden;

  return (
    <Backdrop>
      <div className={modalStyles} ref={modalRef}>
        <div className={s.container}>
          <p className={s.title}>Invite a fren</p>
          <p className={s.text}>
            Copy link or send message invite for
            <br />
            friends
          </p>
          <div className={s.like_input}>
            <p className={s.like_placeholder}>{user?.refLink}</p>
            <button type="button" onClick={copyReflink} className={s.btn_copy}>
              copy
            </button>
          </div>

          <button
            type="button"
            onClick={inviteFriends}
            className={s.btn_invite}
          >
            SEND MESSAGE
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

export default ModalInvite;

ModalInvite.propTypes = {
  close: PropTypes.func.isRequired,
};
