import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { FaChevronDown } from 'react-icons/fa';

import { ElloCol, ElloButton, ElloInput, ElloLoader } from '@components';

import ImportExportButtons from '../ImportExportButtons';
import FilterFormCars from '../FilterFormCars';
import AddFormCars from '../AddFormCars';
import {
  addVehicleModalActions,
  getVehiclesActions,
} from '../../actions/myGarage';
import {
  addVehicleModalSelector,
  editVehicleModalSelector,
  loadingSelector,
  vehiclesListSelector,
} from '../../selectors/myGarage';

import EditFormCars from '../EditFormCars';
import CarsCardComponent from '../CarsCard/CarsCard';
import { currentUserSelector } from '../../../current-user/selectors/auth';

function CarsContent() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const loadingSel = useSelector(loadingSelector);
  const cars = useSelector(vehiclesListSelector);
  const [carsList, setCarsList] = React.useState(cars);
  const { AuthToken } = useSelector(currentUserSelector);
  const [edit, setEdit] = React.useState(null);
  useEffect(() => {
    dispatch(getVehiclesActions({ AuthToken }));
    setCarsList(cars);
  }, []);
  useEffect(() => {
    setCarsList(cars);
  }, [cars]);
  useEffect(() => {
    if (loadingSel) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loadingSel]);
  //modals
  const addVehicleModal = useSelector(addVehicleModalSelector);
  const editVehicleModal = useSelector(editVehicleModalSelector);
  //filter vals
  const [searchText, setSearchText] = useState('');
  const [typeOfCar, setTypeOfCar] = React.useState([]);
  const [accessibilityOfCar, setAccessibilityOfCar] =
    React.useState('Показывать все');
  const [freightOfCar, setFreightOfCar] = React.useState('Показывать все');
  const [driverOfCar, setDriverOfCar] = React.useState('Показывать все');
  const [weigth, setWeigth] = React.useState([0, 100]);
  const [volume, setVolume] = React.useState([0, 330]);
  function handleFilterChanges() {
    let newCarsList = cars;
    let newArrForTypes = [];
    let newArrSearch = [];
    newCarsList?.filter((car) => {
      if (searchText != '') {
        let searchVal =
          JSON.parse(car?.VehicleInfo)?.VehicleType?.toLowerCase() +
          ' ' +
          car?.Model?.toLowerCase();
        console.log(searchVal);
        if (searchVal?.includes(searchText.trim()?.toLowerCase())) {
          newArrSearch.push(car);
        }
        newCarsList = newArrSearch;
      }
    });
    cars.filter((car) => {
      if (typeOfCar.length >= 1) {
        typeOfCar.map((type) => {
          if (JSON.parse(car?.VehicleInfo)?.VehicleType === type) {
            newArrForTypes.push(car);
          } else {
            newCarsList = [];
          }
        });
        newCarsList = newArrForTypes;
      }
    });
    if (accessibilityOfCar == 'Для всех') {
      newCarsList = newCarsList?.filter((car) => car.ForMarket === '1');
    } else if (accessibilityOfCar == 'Для себя') {
      newCarsList = newCarsList?.filter((car) => car.ForMarket === '0');
    } else if (accessibilityOfCar == 'Для партнеров') {
      newCarsList = newCarsList?.filter((car) => car.ForMarket === '2');
    }
    if (driverOfCar === 'Назначен') {
      newCarsList = newCarsList?.filter(
        (car) => car.DriverName && car.DriverInfo
      );
    } else if (driverOfCar === 'Не назначен') {
      newCarsList = newCarsList?.filter(
        (car) => car.DriverInfo == null && car.DriverName === null
      );
    }
    newCarsList = newCarsList?.filter(
      (car) => +car.MaxVolume > volume[0] && +car.MaxVolume < volume[1]
    );
    newCarsList = newCarsList?.filter(
      (car) =>
        +car.MaxMass / 1000 > weigth[0] && +car.MaxMass / 1000 < weigth[1]
    );
    if (freightOfCar === 'Зафрахтован') {
      newCarsList = newCarsList?.filter((car) => car.VehicleShare != null);
    } else if (freightOfCar === 'Без фрахта') {
      newCarsList = newCarsList?.filter((car) => car.VehicleShare == null);
    }
    setCarsList(newCarsList);
  }
  function resetFilter() {
    setTypeOfCar([]);
    setFreightOfCar('Показывать все');
    setAccessibilityOfCar('Показывать все');
    setDriverOfCar('Показывать все');
    setWeigth([0, 100]);
    setVolume([0, 330]);
    setSearchText('');
  }
  useEffect(() => {
    handleFilterChanges();
  }, [
    typeOfCar,
    accessibilityOfCar,
    freightOfCar,
    driverOfCar,
    volume,
    weigth,
    searchText,
  ]);
  const [visibilityFIlters, setVisibilityFIlters] = React.useState(false);
  return (
    <ElloCol className="my-garage-page-container my-garage-cars-wrapper right page flex-column">
      {loading && <ElloLoader />}
      <ImportExportButtons />
      <div className="d-flex flex-row justify-content-between align-items-center">
        <ElloInput
          placeholder="Поиск по aвтомобилям"
          suffix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <ElloButton
          type="primary"
          shape="round"
          className={`my-garage-toggle-button${
            addVehicleModal ? '-active' : ''
          }`}
          onClick={() => dispatch(addVehicleModalActions(true))}
        >
          Добавить автомобиль
        </ElloButton>
      </div>
      <div className="mt-1 ml-1 mr-1 mb-2">
        <div
          className="transport-filters-btn"
          onClick={() => setVisibilityFIlters(!visibilityFIlters)}
        >
          <span className="mr-1 filter-title">Фильтр</span>{' '}
          <FaChevronDown
            className={
              visibilityFIlters
                ? 'company-icon-toggle-active'
                : 'company-icon-toggle'
            }
          />
        </div>

        {visibilityFIlters ? (
          <FilterFormCars
            typeOfCar={typeOfCar}
            setTypeOfCar={setTypeOfCar}
            accessibilityOfCar={accessibilityOfCar}
            setAccessibilityOfCar={setAccessibilityOfCar}
            freightOfCar={freightOfCar}
            setFreightOfCar={setFreightOfCar}
            driverOfCar={driverOfCar}
            setDriverOfCar={setDriverOfCar}
            weigth={weigth}
            setWeigth={setWeigth}
            volume={volume}
            setVolume={setVolume}
            resetFilter={resetFilter}
          />
        ) : null}
        {addVehicleModal ? <AddFormCars carsList={carsList} /> : null}
        {editVehicleModal ? (
          edit ? (
            <EditFormCars vehicleForEdit={edit} />
          ) : null
        ) : null}
      </div>
      <div className="my-garage-cars-list">
        {searchText != '' && carsList.length < 1 ? (
          <span className="my-garage-drivers-list-drivers-not-found">
            Нет транспорта по запросу &quot;{searchText}&quot;
          </span>
        ) : null}
        {carsList
          ? carsList.map((car) => (
              <CarsCardComponent
                key={car.ID}
                car={car}
                id={car.ID}
                setEdit={setEdit}
                // setVisibilityModalCarFreight={setVisibilityModalCarFreight}
              />
            ))
          : null}
      </div>
    </ElloCol>
  );
}

export default CarsContent;
