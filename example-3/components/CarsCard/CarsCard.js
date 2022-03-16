import React from 'react';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa';
import moment from 'moment';

import {
  ElloRow,
  ElloCol,
  ElloTooltip,
  ElloButton,
  ElloPopup,
} from '@components';

import {
  deleteVehiclesActions,
  editVehicleModalActions,
} from '../../actions/myGarage';

import { currentUserSelector } from '../../../current-user/selectors/auth';

import ModalCarFreight from '../ModalCarFreight';

import { TYPE_CARS } from '../../utils/constants';

import './styles.less';

function CarsCardComponent({ car, setEdit }) {
  const dispatch = useDispatch();
  const { AuthToken } = useSelector(currentUserSelector);
  async function deleteVehicle() {
    await dispatch(deleteVehiclesActions({ id: car.ID, AuthToken }));
  }
  let driverInfo = car.DriverInfo ? JSON.parse(car?.DriverInfo) : null;
  let vehicleInfo = car.VehicleInfo ? JSON.parse(car?.VehicleInfo) : null;
  function editVehicle() {
    setEdit(car);
    dispatch(editVehicleModalActions(true));
  }
  function handleTypeOfCar() {
    let svg;
    if (car.VehicleInfo) {
      TYPE_CARS.map((type) => {
        if (
          type.label.toLowerCase() ==
          JSON.parse(car?.VehicleInfo)?.VehicleType.toLowerCase()
        ) {
          svg = type.svg;
        }
      });
    } else {
      svg = '/assets/cars/drugoe.svg';
    }
    return svg;
  }
  const [visibilityModalCarFreight, setVisibilityModalCarFreight] =
    React.useState(false);
  const [visibilityInfo, setVisibilityInfo] = React.useState(false);
  const [trip, setTrip] = React.useState(null);
  const [visibilityDeletePopup, setVisibilityDeletePopup] =
    React.useState(false);
  function handleTrips() {
    if (car.Trip) {
      let allTrips = JSON.parse(car?.Trip).filter(
        (item) => item.TripStatus < 200
      );
      allTrips.sort(function (a, b) {
        var c = new Date(a.TripStart);
        var d = new Date(b.TripStart);
        return c - d;
      });
      setTrip(allTrips[0]);
    }
  }
  React.useEffect(() => {
    handleTrips();
  }, []);
  return (
    <div className="driver-card">
      <ElloPopup
        action={deleteVehicle}
        visibility={visibilityDeletePopup}
        setVisibility={setVisibilityDeletePopup}
        title={'Удалить водителя ?'}
      />
      <ElloRow>
        <ElloCol span={3}>
          <div className="driver-card-driver-avatar">
            <ReactSVG
              style={{ objectFit: 'contain' }}
              src={handleTypeOfCar()}
            />
          </div>
          {car.VehicleShare ? (
            <>
              <ModalCarFreight
                visibilityModalCarFreight={visibilityModalCarFreight}
                setVisibilityModalCarFreight={setVisibilityModalCarFreight}
                car={car}
              />
              <ElloTooltip title="Автомобиль зафрахтован" placement="right">
                <div
                  className="driver-card-driver-avatar-freight cursor"
                  onClick={() => setVisibilityModalCarFreight(true)}
                >
                  <ReactSVG
                    style={{ objectFit: 'contain' }}
                    src={'/assets/icons/freightCar.svg'}
                  />
                </div>
              </ElloTooltip>
            </>
          ) : null}
          {car.VehicleInfo && JSON.parse(car.VehicleInfo).IsTemplate == '1' ? (
            <ElloTooltip title="Шаблон" placement="right">
              <div className="driver-card-driver-avatar-template cursor">
                <ReactSVG
                  style={{ objectFit: 'contain' }}
                  src={'/assets/icons/templateCar.svg'}
                />
              </div>
            </ElloTooltip>
          ) : null}
        </ElloCol>
        <ElloCol span={21}>
          <ElloRow>
            <ElloCol span={9}>
              {' '}
              {car.VehicleShare ? (
                <div className="driver-card-car-freight-title">
                  Автомобиль зафрахтован
                </div>
              ) : null}
            </ElloCol>
            <ElloCol className="mr-3" span={8}></ElloCol>
            <ElloCol span={2}>
              <div
                style={{ width: '200px' }}
                className="d-flex justify-content-end"
              >
                <ElloTooltip placement="topRight" title="Редактировать">
                  <div onClick={() => editVehicle()}>
                    <ReactSVG
                      className="svg-container m-1 cursor"
                      src={'/assets/icons/data/edit.svg'}
                    />
                  </div>
                </ElloTooltip>
                <ElloTooltip title="Удалить">
                  <div onClick={() => setVisibilityDeletePopup(true)}>
                    <ReactSVG
                      className="svg-container m-1 cursor"
                      src={'/assets/icons/data/delete.svg'}
                    />
                  </div>
                </ElloTooltip>
              </div>
            </ElloCol>
          </ElloRow>

          <ElloRow>
            <ElloCol span={9}>
              <ElloRow>
                <span className="my-garage-driver-card-item-title">
                  {car.VehicleInfo ? vehicleInfo.VehicleType : 'Нет данных'}{' '}
                  {car.Model ? car.Model : 'Нет данных'}
                </span>
              </ElloRow>
              <ElloRow>
                {car.Trip && trip ? (
                  <span className="my-garage-driver-card-item">
                    Завершение{' '}
                    {(trip.Status != null &&
                      trip.Status?.Alias == 'ToExecute') ||
                    (trip.Status != null && trip.Status?.Alias == 'Work') ||
                    (trip.Status != null && trip.Status?.Alias == 'Started') ? (
                      <>
                        разгрузки:{' '}
                        {moment(trip.TripEnd).format('DD.MM.YYYY HH:mm')}
                      </>
                    ) : (
                      <>
                        погрузки:{' '}
                        {moment(trip.TripStart).format('DD.MM.YYYY HH:mm')}
                      </>
                    )}
                  </span>
                ) : null}
              </ElloRow>
            </ElloCol>
            <ElloCol className="mr-3" span={8}>
              <ElloRow>
                <span className="my-garage-driver-card-item-title">
                  {' '}
                  Гос.номер:{' '}
                </span>
                <span className="my-garage-driver-card-item">
                  {car.RegNumber ? car.RegNumber : 'Нет данных'}
                </span>
              </ElloRow>
              <ElloRow>
                <span className="my-garage-driver-card-item-title">
                  Водитель:{' '}
                </span>{' '}
                {car.DriverName ? car.DriverName : 'Нет данных'}
              </ElloRow>
            </ElloCol>
            <ElloCol span={2}>
              {car.VehicleShare ? (
                <>
                  <ElloButton
                    className="my-garage-driver-card-btn-freight mt-2"
                    type="primary"
                    shape="round"
                    onClick={() => setVisibilityModalCarFreight(true)}
                  >
                    Фрахт
                  </ElloButton>
                </>
              ) : null}
            </ElloCol>
          </ElloRow>
        </ElloCol>
      </ElloRow>
      <div className="d-flex align-items-center justify-content-center">
        <FaChevronDown
          onClick={() => setVisibilityInfo(true)}
          className={
            visibilityInfo
              ? 'icon-toggle-for-card-d-none'
              : 'icon-toggle-for-cards'
          }
        />
      </div>
      {visibilityInfo ? (
        <>
          {' '}
          <ElloRow>
            <ElloCol span={5}>
              <ElloRow>
                <span className="my-garage-driver-card-item-title">СТС: </span>
                <span className="my-garage-driver-card-item">
                  {car.VehicleInfo ? vehicleInfo.RegCertNum : 'Нет данных'}
                </span>
              </ElloRow>
              <ElloRow>
                <span className="my-garage-driver-card-item-title">VIN: </span>
                <span className="my-garage-driver-card-item">
                  {car.VehicleInfo ? vehicleInfo.VIN : 'Нет данных'}
                </span>
              </ElloRow>
            </ElloCol>
            <ElloCol span={5}>
              <ElloRow>
                <span className="my-garage-driver-card-item-title">
                  Объем, м³:{' '}
                </span>
                <span className="my-garage-driver-card-item">
                  {car.MaxVolume ? car.MaxVolume : 'Нет данных'}
                </span>
              </ElloRow>
              <ElloRow>
                <span className="my-garage-driver-card-item-title">
                  Тип загрузки:
                </span>
                <span className="my-garage-driver-card-item">
                  {car.VehicleInfo ? vehicleInfo.LoadType : 'Нет данных'}
                </span>
              </ElloRow>
            </ElloCol>
            <ElloCol span={5}>
              <ElloRow>
                <span
                  id="my-garage-driver-card"
                  className="my-garage-driver-card-item-title"
                >
                  Грузоподъемность, т:{' '}
                </span>{' '}
                <span className="my-garage-driver-card-item">
                  {car.MaxMass ? car.MaxMass / 1000 : 'Нет данных'}
                </span>
              </ElloRow>
              <ElloRow>
                <span className="my-garage-driver-card-item-title">
                  Параметры (ДхШхВ), м:{' '}
                </span>{' '}
                <span className="my-garage-driver-card-item">
                  {car.MaxUnitLength && car.MaxUnitWidth && car.MaxUnitHeight
                    ? car.MaxUnitLength / 1000 +
                      'x' +
                      car.MaxUnitWidth / 1000 +
                      'x' +
                      car.MaxUnitHeight / 1000
                    : 'Нет данных'}
                </span>
              </ElloRow>
            </ElloCol>
            <ElloCol span={5}>
              <ElloRow>
                <span className="my-garage-driver-card-item-title">ВУ №: </span>{' '}
                <span className="my-garage-driver-card-item">
                  {' '}
                  {car.DriverLicenseNumber
                    ? car.DriverLicenseNumber
                    : 'Нет данных'}
                </span>
              </ElloRow>
              <ElloRow>
                {' '}
                <span className="my-garage-driver-card-item-title">
                  Выдано:{' '}
                </span>
                <span className="my-garage-driver-card-item">
                  {car.VehicleInfo ? vehicleInfo.RegCertDate : 'Нет данных'}
                </span>
              </ElloRow>
            </ElloCol>
            <ElloCol span={4}>
              <ElloRow>
                {' '}
                <span className="my-garage-driver-card-item-title">
                  Категории:{' '}
                </span>
                <span className="my-garage-driver-card-item">
                  {car.DriverInfo
                    ? driverInfo.LicenseCategory.substr(
                        1,
                        driverInfo.LicenseCategory.length - 2
                      )
                    : 'Нет данных'}
                </span>
              </ElloRow>
            </ElloCol>
          </ElloRow>{' '}
          <div className="d-flex align-items-center justify-content-center">
            <FaChevronDown
              onClick={() => setVisibilityInfo(false)}
              className={visibilityInfo ? 'icon-toggle-for-cards-active' : ''}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default CarsCardComponent;
