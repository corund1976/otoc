import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import lotterySelectors from 'redux/lottery/lotterySelectors';

import s from './timer.module.css';

const formatTimer = (startDate) => {
  const now = Math.floor(Date.now() / 1000);
  const end = Math.floor(new Date(startDate).getTime() / 1000);

  const timeLeft = end - now; /* left time in seconds */

  if (timeLeft <= 0) return '000000';
  else {
    const days = Math.floor(timeLeft / 60 / 60 / 24);
    const hour = Math.floor(timeLeft / 60 / 60);
    const min = Math.floor(timeLeft / 60 - hour * 60);
    const sec = timeLeft - hour * 60 * 60 - min * 60;

    if (days < 1)
      return `${hour < 10 ? '0' : ''}${hour}${min < 10 ? '0' : ''}${min}${sec < 10 ? '0' : ''}${sec}`;
    else return `${days < 10 ? '0' : ''}${days}`;
  }
};

// const data = {
//   start_date: '2024-07-24T16:30:06Z',
//   prize: 30,
//   all_tickets: 24,
//   my_tickets: 1,
// };

function Timer() {
  const data = useSelector(lotterySelectors.data);

  const [timer, setTimer] = useState('000000');

  useEffect(() => {
    const delayedAction = setTimeout(() => {
      if (data && data.start_date) setTimer(formatTimer(data.start_date));
    }, 1000);

    return () => clearTimeout(delayedAction);
  }, [data, timer]);

  return (
    <ul className={s.digits}>
      <li>{timer.charAt(0)}</li>
      <li>{timer.charAt(1)}</li>
      {timer && timer.length > 2 ? (
        <>
          <li>{timer.charAt(2)}</li>
          <li>{timer.charAt(3)}</li>
          <li>{timer.charAt(4)}</li>
          <li>{timer.charAt(5)}</li>
        </>
      ) : (
        <p>days</p>
      )}
    </ul>
  );
}

export default Timer;
