import React from 'react';
import { ReactSVG } from 'react-svg';
import { FaChevronDown } from 'react-icons/fa';

import {
  ElloRow,
  ElloCol,
  ElloTooltip,
  ElloButton,
  ElloAvatar,
} from '@components';

import './styles.less';

const Row1 = ({
  driver,
  editDriver,
  sendInvite,
  visibilityInfo,
  setVisibilityInfo,
  setVisibilityDeletePopup,
  setVisibilityBlockPopup,
}) => {
  return (
    <>
      <ElloRow>
        <ElloCol span={3}></ElloCol>
        <ElloCol>
          <span className="my-garage-driver-card-driverName">
            {driver.Name ? driver.Name : 'Нет данных'}
          </span>
        </ElloCol>
      </ElloRow>
      <ElloRow>
        <ElloCol span={3}>
          <ElloAvatar
            size={80}
            src={
              driver.Avatar ? (
                'https:' + driver.Avatar.url
              ) : (
                <ReactSVG
                  className="svg-container"
                  src={'/assets/icons/driverAvatar.svg'}
                />
              )
            }
          />
        </ElloCol>
        <ElloCol span={7}>
          <ElloCol>
            <span className="my-garage-driver-card-item-title">Телефон:</span>
            <br />
            <span className="my-garage-driver-card-item">
              {driver.Phone ? driver.Phone : 'Нет данных'}
            </span>
          </ElloCol>
          <ElloCol>
            <span className="my-garage-driver-card-item-title">Email:</span>{' '}
            <br />
            <span className="my-garage-driver-card-item">
              {driver?.DriverInfo
                ? JSON.parse(driver.DriverInfo).Email
                : 'Нет данных'}
            </span>
          </ElloCol>
        </ElloCol>
        <ElloCol span={5}>
          <ElloCol>
            <span className="my-garage-driver-card-item-title">Номер ВУ: </span>
            <br />
            <span className="my-garage-driver-card-item">
              {driver.LicenseNumber ? driver.LicenseNumber : 'Нет данных'}
            </span>
          </ElloCol>
          <ElloCol>
            <span className="my-garage-driver-card-item-title">
              Открытые категории:
            </span>
            <br />
            <span className="my-garage-driver-card-item">
              {driver?.DriverInfo
                ? JSON.parse(driver?.DriverInfo).LicenseCategory.substr(
                    1,
                    JSON.parse(driver?.DriverInfo).LicenseCategory.length - 2
                  )
                : 'Нет данных'}
            </span>
          </ElloCol>
        </ElloCol>
        <ElloCol span={8}>
          <ElloButton onClick={() => sendInvite()} type="primary" shape="round">
            Пригласить в моб. приложение
          </ElloButton>
        </ElloCol>
        <ElloCol span={1}>
          <ElloTooltip placement="left" title="Удалить">
            <div
              className="cursor"
              onClick={() => setVisibilityDeletePopup(true)}
              style={{ margin: '3px' }}
            >
              <ReactSVG
                className="my-garage-driver-card-svg"
                src={'/assets/icons/data/delete.svg'}
              />
            </div>
          </ElloTooltip>

          <div
            className="cursor"
            onClick={() => editDriver()}
            style={{ margin: '3px' }}
          >
            <ElloTooltip placement="left" title="Редактировать">
              <ReactSVG
                className="my-garage-driver-card-svg"
                src={'/assets/icons/data/edit.svg'}
              />
            </ElloTooltip>
          </div>
          <div
            className="driver-card-unlock-btns cursor"
            style={{ margin: '3px' }}
          >
            {driver.Blocked ? (
              <ElloTooltip placement="left" title="Разблокировать сотрудника">
                <ReactSVG
                  className="my-garage-driver-card-svg"
                  src={'/assets/icons/data/block.svg'}
                  onClick={() => setVisibilityBlockPopup(true)}
                />
              </ElloTooltip>
            ) : (
              <div className="driver-card-unblock-user-container">
                <ElloTooltip placement="left" title="Заблокировать сотрудника">
                  <ReactSVG
                    className="svg-container"
                    src={'/assets/icons/data/unblock.svg'}
                    onClick={() => setVisibilityBlockPopup(true)}
                  />
                </ElloTooltip>
              </div>
            )}
          </div>
        </ElloCol>
      </ElloRow>
      <div className="d-flex align-items-center justify-content-center">
        <FaChevronDown
          onClick={() => setVisibilityInfo(true)}
          rotate={visibilityInfo ? 90 : 0}
          className={
            visibilityInfo
              ? 'icon-toggle-for-card-d-none'
              : 'icon-toggle-for-cards'
          }
        />
      </div>
    </>
  );
};

export default Row1;
