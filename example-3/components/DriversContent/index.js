import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { FaChevronDown } from 'react-icons/fa';

import { ElloCol, ElloButton, ElloInput, ElloLoader } from '@components';

import {
  addDriverModalActions,
  getDriversActions,
  sendToDriverInviteToAppModalActions,
} from '../../actions/myGarage';

import {
  addDriverModalSelector,
  driversListSelector,
  editDriverModalSelector,
  loadingSelector,
  sendToDriverInviteToAppModalSelector,
} from '../../selectors/myGarage';
import { currentUserSelector } from '../../../current-user/selectors/auth';

import ImportExportButtons from '../ImportExportButtons';
import DriverCard from '../DriverCard';
import AddFormDrivers from '../AddFormDriver';
import EditFormDrivers from '../EditFormDriver';
import FilterFormDrivers from '../FilterFormDrivers';
import ModalSendInvite from '../ModalSendInvite';
import ModalResetPassword from '../ModalResetDriverPassword';

import './styles.less';

function DriversContent() {
  const dispatch = useDispatch();
  const drivers = useSelector(driversListSelector);
  const [driversList, setDriversList] = React.useState(drivers);
  const { AuthToken } = useSelector(currentUserSelector);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const addDriverModal = useSelector(addDriverModalSelector);
  const editDriverModal = useSelector(editDriverModalSelector);
  const sendToDriverInviteToAppModal = useSelector(
    sendToDriverInviteToAppModalSelector
  );
  const handleCloseAddForm = () => {
    dispatch(addDriverModalActions(false));
  };
  const handleVisibilityModalSendInvite = () => {
    dispatch(sendToDriverInviteToAppModalActions(false));
  };
  const loadingSel = useSelector(loadingSelector);
  useEffect(() => {
    dispatch(getDriversActions({ AuthToken }));
    setDriversList(drivers);
  }, []);
  useEffect(() => {
    setDriversList(drivers);
  }, [drivers]);
  useEffect(() => {
    if (loadingSel) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loadingSel]);
  const [appointedDriver, setAppointedDriver] = useState('Показывать всех');
  const [categoryOfDriver, setCategoryOfDriver] = useState([]);
  const [edit, setEdit] = React.useState(null);
  function handleChangesFilter() {
    let newDriversList = drivers;
    let newArrForCategory = [];
    newDriversList = newDriversList?.filter((driver) =>
      driver.Name.toLowerCase().includes(searchText.trim().toLowerCase())
    );
    drivers.filter((driver) => {
      if (categoryOfDriver.length >= 1) {
        categoryOfDriver.map((item) => {
          if (
            driver.DriverInfo &&
            JSON.parse(driver?.DriverInfo)
              .LicenseCategory.substr(
                1,
                JSON.parse(driver?.DriverInfo).LicenseCategory.length - 2
              )
              .split(',')
              .includes(item)
          ) {
            newArrForCategory.push(driver);
          } else {
            newDriversList = [];
          }
        });
        newDriversList = newArrForCategory;
      }
    });
    if (appointedDriver === 'Назначен') {
      newDriversList = newDriversList?.filter(
        (driver) => driver.Appointed == '1'
      );
    } else if (appointedDriver === 'Не назначен') {
      newDriversList = newDriversList?.filter(
        (driver) => driver.Appointed == '0'
      );
    }
    setDriversList(newDriversList);
  }
  function handleResetFilter() {
    setAppointedDriver('Показывать всех');
    setCategoryOfDriver([]);
    setSearchText('');
  }
  useEffect(() => {
    handleChangesFilter();
  }, [appointedDriver, categoryOfDriver, searchText]);
  const [visibilityFIlters, setVisibilityFIlters] = React.useState(false);
  return (
    <ElloCol className="my-garage-page-container my-garage-cars-wrapper right page flex-column">
      {loading && <ElloLoader />}
      <ImportExportButtons />
      <ModalSendInvite
        visibilityModalSendInvite={sendToDriverInviteToAppModal}
        handleVisibilityModalSendInvite={handleVisibilityModalSendInvite}
      />
      <ModalResetPassword />
      <div className="d-flex flex-row justify-content-between align-items-center">
        <ElloInput
          placeholder="Поиск по водителям"
          suffix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <ElloButton
          type="primary"
          shape="round"
          className={`my-garage-toggle-button${
            addDriverModal ? '-active' : ''
          }`}
          onClick={() => dispatch(addDriverModalActions(true))}
        >
          Добавить водителя
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
          <FilterFormDrivers
            appointedDriver={appointedDriver}
            categoryOfDriver={categoryOfDriver}
            setAppointedDriver={setAppointedDriver}
            setCategoryOfDriver={setCategoryOfDriver}
            handleResetFilter={handleResetFilter}
          />
        ) : null}
        {addDriverModal ? (
          <AddFormDrivers handleCloseAddForm={handleCloseAddForm} />
        ) : null}
        {editDriverModal ? (
          edit ? (
            <EditFormDrivers setLoading={setLoading} edit={edit} />
          ) : null
        ) : null}
      </div>
      <div className="my-garage-drivers-list">
        {driversList ? (
          <>
            {searchText != '' && driversList.length < 1 ? (
              <span className="my-garage-drivers-list-drivers-not-found">
                Нет водителей по запросу &quot;{searchText}&quot;
              </span>
            ) : null}

            {driversList.map((driver) => (
              <DriverCard key={driver.ID} driver={driver} setEdit={setEdit} />
            ))}
          </>
        ) : null}
      </div>
    </ElloCol>
  );
}

export default DriversContent;
