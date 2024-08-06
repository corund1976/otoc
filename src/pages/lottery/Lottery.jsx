import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from '@twa-dev/sdk/react';

import authSelectors from 'redux/auth/authSelectors';
import lotterySelectors from 'redux/lottery/lotterySelectors';

import lotteryOperations from 'redux/lottery/lotteryOperations';

import RouteNames from 'router/routes';

import ton from 'images/ton.webp';
import ticket from 'images/ticket.webp';

import LotterySoon from 'components/lotterySoon';

import Timer from './timer';
import ModalBuy from './modalBuy';

import s from './lottery.module.css';

function Lottery() {
  const dispatch = useDispatch();
  const isAuth = useSelector(authSelectors.isAuthorized);
  const data = useSelector(lotterySelectors.data);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { lotteryName } = useParams();

  const [displayBuy, setDisplayBuy] = useState(false);
  const toggleBuy = () => setDisplayBuy(!displayBuy);

  useEffect(() => {
    if (isAuth) dispatch(lotteryOperations.getLotteryData(lotteryName));
  }, [dispatch, isAuth, lotteryName]);

  const sectionStyles = data ? s.section_animated : s.section;

  const goBack = () => {
    const backLinkHref = state?.from ?? `/${RouteNames.DAILY}`;
    navigate(backLinkHref);
  };
  return (
    <>
      <BackButton onClick={goBack} />

      <section className={sectionStyles}>
        {lotteryName === 'special' ? (
          <LotterySoon />
        ) : (
          <div className={s.block}>
            <p className={s.title}>{lotteryName} lottery</p>

            <Timer />

            <ul className={s.stats}>
              <li>
                <p className={s.label}>Prizepool ATM:</p>
                <div className={s.value}>
                  <img src={ton} alt="ton" />
                  {Math.round(data?.prize) || 0}
                </div>
              </li>
              <li>
                <p className={s.label}>All tickets:</p>
                <div className={s.value}>
                  <img src={ticket} alt="ticket" />
                  {data?.all_tickets || 0}
                </div>
              </li>
              <li>
                <p className={s.label}>My tickets:</p>
                <div className={s.value}>
                  <img src={ticket} alt="ticket" />
                  {data?.my_tickets || 0}
                </div>
              </li>
            </ul>

            <button
              type="button"
              onClick={toggleBuy}
              className={s.btn_go}
              title="let`s go"
            />
          </div>
        )}
      </section>

      {displayBuy && <ModalBuy close={toggleBuy} />}
    </>
  );
}

export default Lottery;
