import { useState } from 'react';
import { useSelector } from 'react-redux';

import friendsSelectors from 'redux/friends/friendsSelectors';

import ton from 'images/ton.webp';

import ModalWithdraw from 'components/modalWithdraw';

import s from './reward.module.css';

const formatValue = (value) => {
  if (Number(value) % 1 === 0) return value;
  else return Math.ceil(Number(value) * 100) / 100;
};

function Reward() {
  const reward = useSelector(friendsSelectors.reward);

  const [displayWithdraw, setDisplayWithdraw] = useState(false);
  const toggleWithdraw = () => setDisplayWithdraw(!displayWithdraw);

  return (
    <>
      <ul className={s.reward}>
        <li>
          <p className={s.label}>Received:</p>
          <div className={s.value}>
            {formatValue(reward)}
            <img src={ton} alt="ton" />
          </div>
        </li>
        <li>
          <button
            type="button"
            onClick={toggleWithdraw}
            className={s.btn_withdraw}
          >
            withdrawal
          </button>
        </li>
      </ul>

      {displayWithdraw && <ModalWithdraw close={toggleWithdraw} />}
    </>
  );
}

export default Reward;
