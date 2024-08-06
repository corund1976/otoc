import { useSelector } from 'react-redux';

import userSelectors from 'redux/user/userSelectors';

import Container from 'components/container';

import Card from './card';
import Stats from './stats';
import History from './history';

import s from './profile.module.css';

function Profile() {
  const user = useSelector(userSelectors.user);

  return (
    <section className={s.section}>
      <Container>
        <p className={s.title_user}>{user?.name}</p>
        <Card />
        <Stats />
        <p className={s.title_history}>history lottery</p>
        <History />
      </Container>
    </section>
  );
}

export default Profile;
