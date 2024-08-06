import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

import balanceSelectors from 'redux/balance/balanceSelectors';

import { setDisplayModal } from 'redux/app/appSlice';
import { setWithdrawStatus } from 'redux/balance/balanceSlice';

import balanceOperations from 'redux/balance/balanceOperations';

import useOutsideClick from 'hooks/useOutsideClick';

import Backdrop from 'components/backdrop';
import Input from 'ui/input';

import s from './modalWithdraw.module.css';

function ModalWithdraw({ close }) {
  const dispatch = useDispatch();
  const balanceTon = useSelector(balanceSelectors.ton);
  const withdrawStatus = useSelector(balanceSelectors.withdrawStatus);

  const modalRef = useRef();

  const [amount, setAmount] = useState('');

  const [displayWithdraw, setDisplayWithdraw] = useState(false);

  const closeModal = () => {
    dispatch(setDisplayModal(false));
    dispatch(setWithdrawStatus(null));

    setDisplayWithdraw(false);

    close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!amount) {
      Notify.warning('Enter amount');
      return;
    }

    if (Number(amount) % 1 !== 0) {
      Notify.warning('Enter a whole amount');
      return;
    }

    if (Number(amount) > balanceTon) {
      Notify.warning('Amount exeeds balance');
      return;
    }

    const data = {
      amount: Number(amount),
    };

    dispatch(balanceOperations.withdraw(data));
  };

  const setAll = () => setAmount(balanceTon);

  useEffect(() => {
    dispatch(setDisplayModal(true));
    setDisplayWithdraw(true);
  }, [dispatch]);

  useOutsideClick(modalRef, closeModal, displayWithdraw);

  return (
    <Backdrop>
      <div className={s.modal} ref={modalRef}>
        <button
          type="button"
          onClick={closeModal}
          title="close"
          className={s.btn_close}
        />
        <div className={s.bgi} />
        <p className={s.title}>Withdrawal</p>

        {withdrawStatus === 'success' ? (
          <>
            <p className={s.text}>
              Withdrawal requested successful. Check your balance in some
              minutes.
            </p>
            <button type="button" onClick={closeModal} className={s.btn_ok}>
              accept
            </button>
          </>
        ) : (
          <>
            <p className={s.text}>
              Enter the required amount to withdraw to your wallet
            </p>
            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.input_wrapper}>
                <Input
                  id="withdrawInputAmount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={setAmount}
                />
                <button type="button" onClick={setAll} className={s.btn_all}>
                  all
                </button>
              </div>
              <button type="submit" className={s.btn_ok}>
                accept
              </button>
            </form>
          </>
        )}
      </div>
    </Backdrop>
  );
}

export default ModalWithdraw;

ModalWithdraw.propTypes = {
  close: PropTypes.func.isRequired,
};
