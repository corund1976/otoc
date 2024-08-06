import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import appSelectors from 'redux/app/appSelectors';

import RouteNames from 'router/routes';

import bgi from 'images/home/home-bg.webp';

import ModalPrivacy from './modalPrivacy';

import s from './main.module.css';

function Main() {
  const displayPrivacy = useSelector(appSelectors.displayPrivacy);

  return (
    <section className={s.section}>
      <img src={bgi} alt="OTOC" />

      <ul className={s.links_list}>
        <li>
          <Link
            to={RouteNames.DAILY}
            state={{ from: RouteNames.MAIN }}
            className={s.link_daily}
          />
        </li>
        <li>
          <Link
            to={RouteNames.SPECIAL}
            state={{ from: RouteNames.MAIN }}
            className={s.link_special}
          />
        </li>
        <li>
          <Link
            to={RouteNames.MONTHLY}
            state={{ from: RouteNames.MAIN }}
            className={s.link_monthly}
          />
        </li>
      </ul>

      {displayPrivacy && <ModalPrivacy />}
    </section>
  );
}

export default Main;
