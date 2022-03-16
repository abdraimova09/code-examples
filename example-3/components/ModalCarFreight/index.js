import React from 'react';

import { ElloModal, ElloCard } from '@components';

import './styles.less';
import { CloseCircleFilled } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
// import { ReactSVG } from 'react-svg';

const ModalCarFreight = ({
  visibilityModalCarFreight,
  setVisibilityModalCarFreight,
  car,
}) => {
  return (
    <ElloModal
      style={{ top: 50 }}
      footer={null}
      destroyOnClose
      onCancel={() => setVisibilityModalCarFreight(false)}
      closeIcon={<CloseCircleFilled className="modal-close-icon" />}
      visible={visibilityModalCarFreight}
    >
      <h2 className="ml-3">Ваша машина зафрахтована</h2>
      <div className="modal-car-freight">
        <div className="ml-3">
          <div className="d-flex">
            <div>
              <div className="modal-car-freight-item mt-3">
                <span className="modal-car-freight-title">Автомобиль</span>
                <span className="modal-car-freight-desc">
                  {car.VehicleInfo && JSON.parse(car?.VehicleInfo)
                    ? JSON.parse(car?.VehicleInfo).VehicleType
                    : 'Нет данных'}
                </span>
                <span className="modal-car-freight-desc">
                  {car.VehicleInfo && JSON.parse(car?.VehicleInfo)
                    ? 'VIN ' + JSON.parse(car?.VehicleInfo).VIN
                    : 'Нет данных'}
                </span>
              </div>
              <div className="modal-car-freight-item mt-3">
                <span className="modal-car-freight-title">Гос номер</span>
                <span className="modal-car-freight-desc">
                  {' '}
                  {car.RegNumber ? car.RegNumber : 'Нет данных'}
                </span>
                <span className="modal-car-freight-desc">
                  {car.VehicleInfo && JSON.parse(car?.VehicleInfo).RegCertNum
                    ? 'СТС ' + JSON.parse(car?.VehicleInfo).RegCertNum
                    : 'Нет данных'}
                </span>
              </div>
            </div>

            <div>
              <div className="modal-car-freight-item mt-3">
                <span className="modal-car-freight-title">Водитель</span>
                <span className="modal-car-freight-desc">
                  {car.DriverName ? car.DriverName : 'Нет данных'}
                </span>
              </div>
              <div className="modal-car-freight-item mt-3">
                <span className="modal-car-freight-title">ВУ</span>
                <span className="modal-car-freight-desc">
                  {' '}
                  {car.DriverLicenseNumber
                    ? '№: ' + car.DriverLicenseNumber
                    : 'Нет данных'}
                </span>
                <span className="modal-car-freight-desc">
                  {' '}
                  {car.VehicleInfo
                    ? 'Выдано: ' + JSON.parse(car?.VehicleInfo).RegCertDate
                    : 'Нет данных'}
                </span>
                <span className="modal-car-freight-desc">
                  {car.DriverInfo
                    ? 'Категории: ' +
                      JSON.parse(car?.DriverInfo).LicenseCategory.substr(
                        1,
                        JSON.parse(car?.DriverInfo).LicenseCategory.length - 2
                      )
                    : 'Нет данных'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {JSON.parse(car?.VehicleShare).map((shares, index) => (
            <ElloCard key={index}>
              <div className="d-flex align-items-center">
                {/* {shares.Avatar ? (
                //   <div className="modal-car-freight-img">
                <img width="100px" src={shares.Avatar.OriginalName} />
              ) : ( */}
                {/* //   </div> */}
                <ReactSVG
                  style={{
                    width: '70px',
                    borderRadius: '25px',
                    height: '70px',
                  }}
                  className="svg-container mr-3"
                  src={'/assets/icons/addDriverImg.svg'}
                />
                {/* )} */}
                <div>{shares.Name}</div>
              </div>
            </ElloCard>
          ))}
        </div>
      </div>
    </ElloModal>
  );
};

export default ModalCarFreight;
