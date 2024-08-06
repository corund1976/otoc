import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  // TonConnectButton,
  useTonAddress,
  // useTonConnectUI,
  useTonWallet,
  // useTonConnectUI,
} from '@tonconnect/ui-react';

import {
  setWalletAddressFriendly,
  setWalletAddressRaw,
  setWalletData,
  setWalletIsConnected,
} from 'redux/wallet/walletSlice';

import s from './tonConnect.module.css';

function TonConnect() {
  const dispatch = useDispatch();

  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const wallet = useTonWallet();

  // const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (userFriendlyAddress)
      dispatch(setWalletAddressFriendly(userFriendlyAddress));
  }, [dispatch, userFriendlyAddress]);

  useEffect(() => {
    if (rawAddress) dispatch(setWalletAddressRaw(rawAddress));
  }, [dispatch, rawAddress]);

  useEffect(() => {
    if (wallet) {
      dispatch(setWalletIsConnected(true));
      dispatch(setWalletData(wallet));
    } else {
      dispatch(setWalletIsConnected(false));
      dispatch(setWalletData(null));
    }
  }, [dispatch, wallet]);

  // useEffect(() => {
  //   const disconnect = async () => {
  //     if (wallet) await tonConnectUI.disconnect();
  //   };
  //   disconnect();
  // }, [tonConnectUI]);

  // const onLanguageChange = (lang) => setOptions({ language: lang });

  return (
    <div className={s.ton_connect}>
      {/* <TonConnectButton /> */}

      {/* {wallet && (
        <div>
          <span>Connected wallet: {wallet.name}</span>
          <span>Device: {wallet.device.appName}</span>
        </div>
      )} */}
      <div>
        {/* <button onClick={() => tonConnectUI.sendTransaction(transaction)}>
          Send transaction
        </button> */}

        {/* <div>
          <label>language</label>
          <select onChange={(e) => onLanguageChange(e.target.value)}>
            <option value="en">en</option>
            <option value="ru">ru</option>
          </select>
        </div> */}
      </div>
      {/* <button type="button" onClick={disconnect}>
        Disconnect
      </button> */}
    </div>
  );
}

export default TonConnect;
