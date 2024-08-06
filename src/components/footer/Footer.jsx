import { Link, NavLink, useLocation } from 'react-router-dom';

import RouteNames from 'router/routes';

import hrc from 'images/footer/hrc.svg';
import rank from 'images/footer/rank.svg';
import friends from 'images/footer/friends.svg';
import profile from 'images/footer/profile.svg';

import s from './footer.module.css';

function Footer() {
  const { pathname } = useLocation();

  const navlinkStyles = ({ isActive }) =>
    isActive ? s.navlink_active : s.navlink;

  const linkStyles =
    pathname.endsWith(RouteNames.MAIN) ||
    pathname.endsWith(RouteNames.DAILY) ||
    pathname.endsWith(RouteNames.SPECIAL) ||
    pathname.endsWith(RouteNames.MONTHLY)
      ? s.navlink_active
      : s.navlink;

  return (
    <footer>
      <ul className={s.links_list}>
        <li>
          <NavLink to={RouteNames.HRC} className={navlinkStyles}>
            <img src={hrc} alt="hrc" />
            HRC
          </NavLink>
        </li>
        <li>
          <NavLink to={RouteNames.RANK} className={navlinkStyles}>
            <img src={rank} alt="rank" />
            Rank
          </NavLink>
        </li>
        <li>
          <Link to={RouteNames.MAIN} className={linkStyles}>
            Daily
          </Link>
        </li>
        <li>
          <NavLink to={RouteNames.FRIENDS} className={navlinkStyles}>
            <img src={friends} alt="friends" />
            Friends
          </NavLink>
        </li>
        <li>
          <NavLink to={RouteNames.PROFILE} className={navlinkStyles}>
            <img src={profile} alt="profile" />
            Profile
          </NavLink>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
