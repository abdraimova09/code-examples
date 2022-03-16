import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ElloPopup } from '@components';

import {
  deleteDriversActions,
  blockDriversActions,
  editDriverModalActions,
  addDriverModalActions,
  sendToDriverInviteToAppActions,
} from '../../actions/myGarage';
import { currentUserSelector } from '../../../current-user/selectors/auth';

import Row1 from './components/Row1';
import Row2 from './components/Row2';

import './styles.less';

function DriverCard({ driver, setEdit }) {
  const dispatch = useDispatch();
  const { AuthToken } = useSelector(currentUserSelector);
  function deleteDriver() {
    dispatch(
      deleteDriversActions({
        id: driver.ID,
        AuthToken,
      })
    );
  }
  async function editDriver() {
    setEdit(driver);
    dispatch(editDriverModalActions(true));
    dispatch(addDriverModalActions(false));
  }
  function blockDriver() {
    dispatch(blockDriversActions({ id: driver.UserID, AuthToken }));
  }
  function sendInvite() {
    dispatch(sendToDriverInviteToAppActions({ id: driver.UserID, AuthToken }));
  }
  const [visibilityInfo, setVisibilityInfo] = React.useState(false);
  const [visibilityDeletePopup, setVisibilityDeletePopup] =
    React.useState(false);
  const [visibilityBlockPopup, setVisibilityBlockPopup] = React.useState(false);

  return (
    <div className="driver-card">
      <ElloPopup
        action={deleteDriver}
        visibility={visibilityDeletePopup}
        setVisibility={setVisibilityDeletePopup}
        title={'Удалить водителя ?'}
      />
      <ElloPopup
        action={blockDriver}
        visibility={visibilityBlockPopup}
        setVisibility={setVisibilityBlockPopup}
        title={
          driver.Blocked
            ? 'Разблокировать водителя ?'
            : 'Заблокировать водителя ?'
        }
      />
      <Row1
        setVisibilityBlockPopup={setVisibilityBlockPopup}
        setVisibilityDeletePopup={setVisibilityDeletePopup}
        driver={driver}
        editDriver={editDriver}
        blockDriver={blockDriver}
        sendInvite={sendInvite}
        visibilityInfo={visibilityInfo}
        setVisibilityInfo={setVisibilityInfo}
      />
      {visibilityInfo ? (
        <Row2
          visibilityInfo={visibilityInfo}
          setVisibilityInfo={setVisibilityInfo}
          driver={driver}
        />
      ) : null}
    </div>
  );
}

export default DriverCard;
