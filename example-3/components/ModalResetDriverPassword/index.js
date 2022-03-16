import React from 'react';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import { CloseCircleFilled } from '@ant-design/icons';

import { ElloModal, ElloButton } from '@components';

import {
  errorSelector,
  resetDriverPasswordModalSelector,
} from '../../selectors/myGarage';

import { resetDriverPasswordModalActions } from '../../actions/myGarage';

const ModalResetPassword = () => {
  const dispatch = useDispatch();
  const error = useSelector(errorSelector);
  const resetModal = useSelector(resetDriverPasswordModalSelector);
  return (
    <ElloModal
      style={{ top: 50, width: '1000px' }}
      footer={null}
      destroyOnClose
      onCancel={() => dispatch(resetDriverPasswordModalActions(false))}
      closeIcon={<CloseCircleFilled className="modal-close-icon" />}
      visible={resetModal}
    >
      <div className="d-flex flex-column align-items-center justify-content-between mt-3 mb-3 my-garage-send-invite-modal">
        {error ? null : (
          <ReactSVG
            className="my-garage-send-invite-to-app"
            src={'/assets/icons/send-invite.svg'}
          />
        )}
        <div className="my-garage-send-invite-modal-title-top">
          Сброс пароля доступа к приложению экспедитор
        </div>
        <div className="my-garage-send-invite-modal-title-bottom">
          {error ? (
            <>
              {' '}
              <strong>Ошибка!</strong> {error}{' '}
            </>
          ) : (
            'Пароль сброшен'
          )}
        </div>
        <ElloButton
          onClick={() => dispatch(resetDriverPasswordModalActions(false))}
          className="my-garage-send-invite-modal-button"
          shape="round"
        >
          Закрыть
        </ElloButton>
      </div>
    </ElloModal>
  );
};

export default ModalResetPassword;
