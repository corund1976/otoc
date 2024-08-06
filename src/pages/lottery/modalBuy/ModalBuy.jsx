import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { beginCell, toNano } from '@ton/ton';
import PropTypes from 'prop-types';

import balanceSelectors from 'redux/balance/balanceSelectors';
import lotterySelectors from 'redux/lottery/lotterySelectors';
import walletSelectors from 'redux/wallet/walletSelectors';

import { setDisplayModal } from 'redux/app/appSlice';
import { setBuyOtp, setBuyStatus } from 'redux/balance/balanceSlice';
import { setWalletTxHash } from 'redux/wallet/walletSlice';

import balanceOperations from 'redux/balance/balanceOperations';
import lotteryOperations from 'redux/lottery/lotteryOperations';

import useOutsideClick from 'hooks/useOutsideClick';

import Backdrop from 'components/backdrop';
import Input from 'ui/input';

import s from './modalBuy.module.css';

const SYSTEM_WALLET_ADDRESS = import.meta.env.VITE_SYSTEM_WALLET;

function ModalBuy({ close }) {
  const dispatch = useDispatch();
  const lotteryData = useSelector(lotterySelectors.data);
  const balanceTon = useSelector(balanceSelectors.ton);
  const buyOtp = useSelector(balanceSelectors.buyOtp);
  const buyStatus = useSelector(balanceSelectors.buyStatus);

  const isConnected = useSelector(walletSelectors.isConnected);
  const userWalletAddress = useSelector(walletSelectors.addressFriendly);
  const txHash = useSelector(walletSelectors.txHash);

  const [tonConnectUI] = useTonConnectUI();

  const { lotteryName } = useParams();

  const modalRef = useRef();

  const [displayBuy, setDisplayBuy] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [proceedPayment, setProceedPayment] = useState(false);

  const closeModal = () => {
    dispatch(setDisplayModal(false));
    setDisplayBuy(false);
    setQuantity('');
    setProceedPayment(false);
    close();
  };

  const payBalance = () => {
    if (!quantity) {
      Notify.warning('Enter amount of tickets');
      return;
    }

    const amount = Number(quantity) * lotteryData?.price;

    if (amount > balanceTon) {
      Notify.warning('Insufficient balance ');
      return;
    }

    const data = {
      type: 'balance',
      lottery_id: lotteryData?.id,
      quantity: Number(quantity),
    };

    dispatch(balanceOperations.buy(data));
  };

  const payWallet = () => {
    if (!quantity) {
      Notify.warning('Enter amount of tickets');
      return;
    }

    if (!isConnected) {
      tonConnectUI.openModal();
      setProceedPayment(true);
      return;
    }

    dispatch(balanceOperations.getBuyOtp());

    setProceedPayment(true);
  };

  useEffect(() => {
    const sendTransaction = async () => {
      const amount = Number(quantity) * lotteryData?.price;
      // const amount = 0.1;

      const body = beginCell()
        .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
        .storeStringTail(buyOtp) // write our text comment
        .endCell();

      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
        messages: [
          {
            address: SYSTEM_WALLET_ADDRESS, // destination address
            amount: toNano(amount).toString(), //Toncoin in nanotons
            payload: body.toBoc().toString('base64'), // payload with comment in body
          },
        ],
      };

      try {
        const result = await tonConnectUI.sendTransaction(transaction);
        dispatch(setWalletTxHash(result.boc));
        Notify.success('Transaction was sent successfull!');
        // you can use signed boc to find the transaction
        // const someTxData = await myAppExplorerService.getTransaction(result.boc);
        // alert('Transaction was sent successfully', someTxData);
      } catch (error) {
        console.log(error);
      }
    };

    if (proceedPayment && isConnected && buyOtp) {
      sendTransaction();
      setProceedPayment(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, buyOtp, isConnected, proceedPayment, tonConnectUI]);

  useEffect(() => {
    if (txHash && buyOtp) {
      const data = {
        type: 'buy',
        lottery_id: lotteryData?.id,
        quantity: Number(quantity),
        tx_hash: buyOtp,
        sender_address: userWalletAddress,
        amount: Number(quantity) * lotteryData?.price,
      };

      dispatch(balanceOperations.buy(data));

      dispatch(setWalletTxHash(null));
      dispatch(setBuyOtp(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, txHash, buyOtp]);

  useEffect(() => {
    if (buyStatus === 'success') {
      Notify.success(`Get ${quantity} tickets successfull`);

      dispatch(lotteryOperations.getLotteryData(lotteryName));

      dispatch(setBuyStatus(null));

      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyStatus, dispatch]);

  useEffect(() => {
    dispatch(setDisplayModal(true));
    setDisplayBuy(true);
  }, [dispatch]);

  useOutsideClick(modalRef, closeModal, displayBuy);

  const decreaseQuantity = () => {
    if (Number(quantity < 1)) return;
    setQuantity((Number(quantity) - 1).toString());
  };
  const increaseQuantity = () => {
    setQuantity((Number(quantity) + 1).toString());
  };

  return (
    <Backdrop>
      <div className={s.modal} ref={modalRef}>
        <button
          type="button"
          onClick={closeModal}
          title="close"
          className={s.btn_close}
        />

        <div className={s.container}>
          <p className={s.title}>Get tickets</p>
          <div className={s.quantity_wrapper}>
            <button
              type="button"
              onClick={decreaseQuantity}
              className={s.btn_change_quantity}
            >
              -
            </button>
            <Input
              id="lotteryBuyInputTickets"
              value={quantity}
              onChange={setQuantity}
            />
            <button
              type="button"
              onClick={increaseQuantity}
              className={s.btn_change_quantity}
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={payWallet}
            className={s.btn_buy_wallet}
          >
            with wallet
          </button>
          <button
            type="button"
            onClick={payBalance}
            className={s.btn_buy_balance}
          >
            with balance
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

export default ModalBuy;

ModalBuy.propTypes = {
  close: PropTypes.func.isRequired,
};
