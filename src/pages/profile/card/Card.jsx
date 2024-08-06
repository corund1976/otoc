import { useState } from 'react';
import { useSelector } from 'react-redux';

import balanceSelectors from 'redux/balance/balanceSelectors';

import ton from 'images/ton.webp';

import ModalWithdraw from 'components/modalWithdraw';

import s from './card.module.css';

const formatValue = (value) => {
  if (Number(value) % 1 === 0) return value;
  else return Math.ceil(Number(value) * 100) / 100;
};

function Card() {
  const balanceTon = useSelector(balanceSelectors.ton);

  const [displayWithdraw, setDisplayWithdraw] = useState(false);
  const toggleWithdraw = () => setDisplayWithdraw(!displayWithdraw);

  return (
    <>
      <div className={s.card}>
        <p className={s.label}>Available for withdrawal:</p>
        <div className={s.value}>
          {formatValue(balanceTon)}
          <img src={ton} alt="ton" />
        </div>
        <button
          type="button"
          onClick={toggleWithdraw}
          className={s.btn_withdraw}
        >
          withdrawal
        </button>
      </div>

      {displayWithdraw && <ModalWithdraw close={toggleWithdraw} />}
    </>
  );
}

export default Card;
