import { useState } from 'react';
import { useSelector } from 'react-redux';

import friendsSelectors from 'redux/friends/friendsSelectors';

import ModalInfo from '../modalInfo';
import ModalInvite from '../modalInvite';

import s from './progressInvite.module.css';

function ProgressInvite() {
  const friends = useSelector(friendsSelectors.list);

  const [displayInfo, setDisplayInfo] = useState(false);
  const toggleInfo = () => setDisplayInfo(!displayInfo);

  const [displayInvite, setDisplayInvite] = useState(false);
  const toggleInvite = () => setDisplayInvite(!displayInvite);

  return (
    <>
      <div className={s.progress_invite_wrapper}>
        <p className={s.friends}>{friends?.length || 0} friends</p>
        <button
          type="button"
          onClick={toggleInfo}
          title="info"
          className={s.btn_info}
        />
        <button type="button" onClick={toggleInvite} className={s.btn_invite}>
          invite
        </button>
      </div>

      {displayInfo && <ModalInfo close={toggleInfo} />}
      {displayInvite && <ModalInvite close={toggleInvite} />}
    </>
  );
}

export default ProgressInvite;
