import base from 'images/friends/base.svg';
import gold from 'images/friends/gold.svg';

import s from './tubs.module.css';

function Tubs() {
  return (
    <ul className={s.tubs}>
      <li>
        <img src={base} alt="base" />
        <p className={s.name}>base</p>
        <p className={s.text}>
          Score 10% from buddies + 2.5% from their referrals
        </p>
      </li>
      <li>
        <img src={gold} alt="gold" />
        <p className={s.name}>gold</p>
        <p className={s.text}>
          Score 10% from buddies + 5% from their referrals
        </p>
      </li>
    </ul>
  );
}

export default Tubs;
