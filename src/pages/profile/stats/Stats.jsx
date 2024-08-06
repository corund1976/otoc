import { useSelector } from 'react-redux';

import profileSelectors from 'redux/profile/profileSelectors';

import ton from 'images/ton.webp';
import ticket from 'images/ticket.webp';

import s from './stats.module.css';

const formatValue = (value) => {
  if (Number(value) % 1 === 0) return value;
  else return Math.ceil(Number(value) * 100) / 100;
};

function Stats() {
  const totalWinTon = useSelector(profileSelectors.totalWinTon);
  const totalPurchasedTicket = useSelector(
    profileSelectors.totalPurchasedTicket,
  );

  return (
    <ul className={s.stats}>
      <li>
        <p className={s.label}>tickets purchased:</p>
        <div className={s.value}>
          <img src={ticket} alt="ticket" />
          {totalPurchasedTicket}
        </div>
      </li>
      <li>
        <p className={s.label}>amount win:</p>
        <div className={s.value}>
          <img src={ton} alt="ton" />
          {formatValue(totalWinTon)}
        </div>
      </li>
    </ul>
  );
}

export default Stats;
