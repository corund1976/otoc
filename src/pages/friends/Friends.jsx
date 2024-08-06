import Container from 'components/container';

import Reward from './reward';
import Tubs from './tubs';
import ProgressInvite from './progressInvite';
import List from './list';

import s from './friends.module.css';

function Friends() {
  return (
    <section className={s.section}>
      <Container>
        <p className={s.title}>invite friends</p>
        <Reward />
        <Tubs />
        <ProgressInvite />
        <List />
      </Container>
    </section>
  );
}

export default Friends;
