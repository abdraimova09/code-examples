import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ElloForm, ElloInput, ElloButton, ElloFormItem } from '@components';
import { createZonesActions } from '../../actions/myGarage';

import './styles.less';
import { currentUserSelector } from '../../../current-user/selectors/auth';

function AddZonePopup({ mapData, onClose }) {
  const dispatch = useDispatch();
  const handleCancel = React.useCallback(() => {
    onClose();
  }, [onClose]);
  const { AuthToken } = useSelector(currentUserSelector);
  const handleSubmit = React.useCallback(
    (values) => {
      if (values?.name) {
        let zone = {
          Name: values.name,
          BorderHash: `GW${mapData.geohash}`,
        };
        onClose();
        dispatch(createZonesActions({ zone, AuthToken }));
      }
    },
    [dispatch, createZonesActions, onClose]
  );

  return (
    <ElloForm
      layout={'vertical'}
      className="my-garage-zone-form"
      onFinish={handleSubmit}
    >
      <ElloFormItem className="my-garage-zone-form-input" name="name">
        <ElloInput placeholder="Введите название" />
      </ElloFormItem>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <ElloButton
          className="ello-button-submit"
          shape="round"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Cохранить
        </ElloButton>
        <ElloButton
          className="orange-button"
          shape="round"
          size="large"
          type="primary"
          onClick={handleCancel}
        >
          Отменить
        </ElloButton>
      </div>
    </ElloForm>
  );
}

export default AddZonePopup;
