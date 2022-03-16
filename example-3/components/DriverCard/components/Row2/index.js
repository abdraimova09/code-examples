import React from 'react';
import { ElloCol, ElloRow } from '@components';
import { FaChevronDown } from 'react-icons/fa';
const Row2 = ({ driver, visibilityInfo, setVisibilityInfo }) => {
  return (
    <>
      <ElloRow>
        <ElloCol style={{ marginRight: '36px' }} span={2}></ElloCol>
        <ElloCol span={7}>
          <ElloCol>
            <span className="my-garage-driver-card-item-title">Паспорт №:</span>
            <br />
            <span className="my-garage-driver-card-item">
              {driver.PassportNumber ? driver.PassportNumber : 'Нет данных'}
            </span>
          </ElloCol>
          <ElloCol>
            <span className="my-garage-driver-card-item-title">
              Дата выдачи:
            </span>
            <br />
            <span className="my-garage-driver-card-item">
              {driver.PassportDate ? driver.PassportDate : 'Нет данных'}
            </span>
          </ElloCol>
          <ElloCol>
            <span className="my-garage-driver-card-item-title">Кем выдан:</span>
            <br />
            <span className="my-garage-driver-card-item">
              {driver.PassportIssuedBy ? driver.PassportIssuedBy : 'Нет данных'}
            </span>
          </ElloCol>
          <ElloCol>
            <span className="my-garage-driver-card-item-title">
              Назначен на автомобиль:
            </span>
            <br />
            <span className="my-garage-driver-card-item">
              {driver?.Vehicle
                ? JSON.parse(driver.Vehicle).Model +
                  '(' +
                  JSON.parse(driver.Vehicle).VehicleType +
                  ')' +
                  JSON.parse(driver.Vehicle).RegNumber
                : 'Не назначен'}
            </span>
          </ElloCol>
        </ElloCol>
        <ElloCol span={5}>
          {' '}
          <ElloCol>
            <span className="my-garage-driver-card-item-title">
              {' '}
              Дата рождения:{' '}
            </span>
            <br />
            <span className="my-garage-driver-card-item">
              {driver?.DriverInfo
                ? JSON.parse(driver.DriverInfo).Birthday
                : 'Нет данных'}
            </span>
          </ElloCol>
          <ElloCol span={6}>
            <span className="my-garage-driver-card-item-title">
              {' '}
              Адрес регистрации:
            </span>
            <br />
            <span className="my-garage-driver-card-item">
              {driver?.DriverInfo
                ? JSON.parse(driver.DriverInfo).RegAddress
                : 'Нет данных'}
            </span>
          </ElloCol>
        </ElloCol>
      </ElloRow>{' '}
      <div className="d-flex align-items-center justify-content-center">
        <FaChevronDown
          onClick={() => setVisibilityInfo(false)}
          rotate={visibilityInfo ? 90 : 0}
          className={visibilityInfo ? 'icon-toggle-for-cards-active' : ''}
        />
      </div>
    </>
  );
};

export default Row2;
