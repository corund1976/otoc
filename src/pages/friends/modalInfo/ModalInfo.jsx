import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setDisplayModal } from 'redux/app/appSlice';

import useOutsideClick from 'hooks/useOutsideClick';
import useSwipeDetection from 'hooks/useSwipe';

// import ton from 'images/ton.webp';
// import ticket from 'images/ticket.webp';

import Backdrop from 'components/backdrop';

// import levels from './levels';
import points from './points';
import s from './modalInfo.module.css';

function ModalInfo({ close }) {
  const dispatch = useDispatch();

  const modalRef = useRef();

  const [displayInfo, setDisplayInfo] = useState(false);

  const closeModal = () => {
    dispatch(setDisplayModal(false));
    setDisplayInfo(false);
    close();
  };

  const { swipeVertical } = useSwipeDetection(displayInfo);

  useEffect(() => {
    dispatch(setDisplayModal(true));
    setDisplayInfo(true);
  }, [dispatch]);

  useEffect(() => {
    if (swipeVertical === 'down') closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swipeVertical]);

  useOutsideClick(modalRef, closeModal, displayInfo);

  const modalStyles = displayInfo ? s.modal : s.modal_hidden;

  return (
    <Backdrop>
      <div className={modalStyles} ref={modalRef}>
        <div className={s.container}>
          <p className={s.title}>Referral Bonuses</p>
          <p className={s.under_title}>Invite your friends and get a reward</p>
          {/* <ul className={s.points}>
            {levels.map(({ id, friends, tickets, tons }) => (
              <li key={id}>
                <div className={s.medal}>
                  {friends >= 1000 ? `${friends / 1000}K` : friends}
                </div>
                <div className={s.stats}>
                  <p className={s.friends}>
                    {friends.toLocaleString('ru')} friends
                  </p>
                  <ul className={s.ticket_token_wrapper}>
                    <li>
                      <p className={s.label}>Tickets:</p>
                      <div className={s.value}>
                        <img src={ticket} alt="ricket" />
                        {tickets}
                      </div>
                    </li>
                    <li>
                      <p className={s.label}>Tokens:</p>
                      <div className={s.value}>
                        <img src={ton} alt="ton" />
                        {tons}
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul> */}
          <ul className={s.points}>
            {points.map(({ id, friends, text }) => (
              <li key={id}>
                <div className={s.medal}>
                  {friends >= 1000 ? `${friends / 1000}K` : friends}
                </div>
                <div className={s.desc}>{text}</div>
              </li>
            ))}
          </ul>

          <p className={s.disclaimer}>
            * in order to activate ref bonuses your frens have to buy at least 1
            ticket in Daily or Monthly Lotteries
          </p>
        </div>
      </div>
    </Backdrop>
  );
}

export default ModalInfo;

ModalInfo.propTypes = {
  close: PropTypes.func.isRequired,
};
