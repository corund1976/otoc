import lock from 'images/home/lock.svg';

import s from './lotterySoon.module.css';

function LotterySoon() {
  return (
    <div className={s.locked}>
      <img src={lock} alt="locked" className={s.img} />
      <p className={s.title}>Coming soon</p>
    </div>
  );
}

export default LotterySoon;
