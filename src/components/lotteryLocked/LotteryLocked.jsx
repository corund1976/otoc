import lock from 'images/home/lock.svg';

import s from './lotteryLocked.module.css';

function LotteryLocked() {
  return (
    <div className={s.locked}>
      <img src={lock} alt="locked" className={s.img} />
      <p className={s.title}>
        You cannot participate in this lottery at the moment
      </p>
      <p className={s.text}>
        To unlock this lottery you need to participate in 10 daily or monthly
        lotteries
      </p>
    </div>
  );
}

export default LotteryLocked;
