import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import authSelectors from 'redux/auth/authSelectors';
import friendsSelectors from 'redux/friends/friendsSelectors';

import friendsOperations from 'redux/friends/friendsOperations';

import ton from 'images/ton.webp';

import s from './list.module.css';

function List() {
  const dispatch = useDispatch();
  const isAuth = useSelector(authSelectors.isAuthorized);
  const list = useSelector(friendsSelectors.list);

  useEffect(() => {
    if (isAuth && !list) dispatch(friendsOperations.getFriendsList());
  }, [dispatch, isAuth, list]);

  return (
    list &&
    list.length > 0 && (
      <ul className={s.list}>
        {list.map(({ id, avatar, name, invited, amount }) => (
          <li key={id}>
            <div className={s.avatar}>
              {avatar ? <img src={avatar} alt="avatar" /> : name.charAt(0)}
            </div>
            <div>
              <p className={s.name}>{name}</p>
              <p className={s.invited}>{invited} invited friends</p>
            </div>
            <div className={s.reward}>
              <img src={ton} alt="ton" />
              {Number(amount).toFixed(3)}
            </div>
          </li>
        ))}
      </ul>
    )
  );
}

export default List;
