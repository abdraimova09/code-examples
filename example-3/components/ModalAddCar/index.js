import React from 'react';

import { ElloModal } from '@components';
import { CloseCircleFilled } from '@ant-design/icons';
import AddFormCars from '../AddFormCars';
import { useDispatch, useSelector } from 'react-redux';
import { addCarModalSelector } from '../../selectors/myGarage';
import { handleAddCarModal } from '../../actions/myGarage';

import './styles.less';
// import { frontPageAddVehicleModalSelector } from '../../selectors/myGarage';
// import { frontPageAddVehicleModalActions } from '../../actions/myGarage';
const ModalAddCar = () => {
  const carModal = useSelector(addCarModalSelector);
  function handleModal() {
    dispatch(handleAddCarModal());
  }
  // const frontPageAddVehicleModal = useSelector(
  //   frontPageAddVehicleModalSelector
  // );
  const dispatch = useDispatch();
  return (
    <ElloModal
      style={{ top: 50 }}
      width={750}
      footer={null}
      span={24}
      visible={carModal}
      onCancel={handleModal}
      destroyOnClose
      closeIcon={<CloseCircleFilled className="modal-close-icon" />}
    >
      {/* <ElloSpin indicator={antIcon} spinning={loading}> */}
      <div className="modal-add-car-title pr-3">Добавить машину</div>
      <div className="modal-add-car pr-3">
        <AddFormCars visibilityButtonClose={false} />
      </div>
      {/* </ElloSpin> */}
    </ElloModal>
  );
};

export default ModalAddCar;
