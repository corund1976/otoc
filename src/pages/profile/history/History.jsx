import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import authSelectors from 'redux/auth/authSelectors';
import profileSelectors from 'redux/profile/profileSelectors';

import profileOperations from 'redux/profile/profileOperations';

import event from 'images/profile/event.webp';
import ton from 'images/ton.webp';
import ticket from 'images/ticket.webp';

import s from './history.module.css';

// const history = [
//   {
//     lottery: 15,
//     date: '2024-07-24T19:30:06+03:00',
//     name: 'Daily',
//     status: true,
//     reward: '0.00',
//   },
// ];

function History() {
  const dispatch = useDispatch();
  const isAuth = useSelector(authSelectors.isAuthorized);
  const history = useSelector(profileSelectors.eventsHistory);

  const [filter, setFilter] = useState('active'); /* active, inactive */
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (isAuth && !history) dispatch(profileOperations.getEvetsHistory());
  }, [dispatch, history, isAuth]);

  useEffect(() => {
    if (history && history.length) {
      if (filter === 'active')
        setFilteredList(history.filter(({ status }) => status === true));
      else setFilteredList(history.filter(({ status }) => status === false));
    } else setFilteredList([]);
  }, [filter, history]);

  return (
    <>
      <ul className={s.selectors}>
        <li>
          <button
            type="button"
            onClick={() => setFilter('active')}
            className={filter === 'active' ? s.selector_active : s.selector}
          >
            active
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setFilter('inactive')}
            className={filter === 'inactive' ? s.selector_active : s.selector}
          >
            not active
          </button>
        </li>
      </ul>

      {filteredList && filteredList.length > 0 && (
        <ul className={s.list}>
          {filteredList.map(({ lottery, name, date, reward, tickets }) => (
            <li key={lottery}>
              <p className={s.name}>{name}</p>
              <p className={s.date}>{date?.slice(0, 10)}</p>
              <img src={event} alt="event" className={s.img} />
              <ul className={s.prize_tickets_wrapper}>
                <li>
                  <p className={s.label}>Prize:</p>
                  <div className={s.value}>
                    <img src={ton} alt="ton" />
                    {Math.round(reward)}
                  </div>
                </li>
                <li>
                  <p className={s.label}>Tickets:</p>
                  <div className={s.value}>
                    <img src={ticket} alt="ticket" />
                    {Math.round(tickets)}
                  </div>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default History;
