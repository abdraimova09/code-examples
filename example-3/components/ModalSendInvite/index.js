import React from 'react';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import { CloseCircleFilled } from '@ant-design/icons';

import { ElloModal, ElloButton } from '@components';

import { errorSelector } from '../../selectors/myGarage';

import './styles.less';

const ModalSendInvite = ({
  visibilityModalSendInvite,
  handleVisibilityModalSendInvite,
}) => {
  const error = useSelector(errorSelector);
  return (
    <ElloModal
      style={{ top: 50, width: '1000px' }}
      footer={null}
      destroyOnClose
      onCancel={() => handleVisibilityModalSendInvite(false)}
      closeIcon={<CloseCircleFilled className="modal-close-icon" />}
      visible={visibilityModalSendInvite}
    >
      <div className="d-flex flex-column align-items-center justify-content-between mt-3 mb-3 my-garage-send-invite-modal">
        {error ? null : (
          <ReactSVG
            className="my-garage-send-invite-to-app"
            src={'/assets/icons/send-invite.svg'}
          />
        )}
        <div className="my-garage-send-invite-modal-title-top">
          Отправка ссылки на приложение экспедитор
        </div>
        <div className="my-garage-send-invite-modal-title-bottom">
          {error ? error : ' Ссылка успешно отправлена'}
        </div>
        <ElloButton
          onClick={() => handleVisibilityModalSendInvite(false)}
          className="my-garage-send-invite-modal-button"
          shape="round"
        >
          Закрыть
        </ElloButton>
      </div>
    </ElloModal>
  );
};

export default ModalSendInvite;
