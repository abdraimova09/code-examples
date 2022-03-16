/* eslint-disable */
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { ElloInput } from '@components';
import ZoneItems from '../ZoneItems';
import {zonesSelector} from '../../../../selectors/myGarage'
import {
  deleteZonesActions,
  getZonesActions,
  searchZonesActions,
  setCurrentZoneActions
} from '../../../../actions/myGarage';

import './styles.less';
import { currentUserSelector } from '../../../../../current-user/selectors/auth';

function FormContent() {
  const dispatch = useDispatch();
  const zones = useSelector(zonesSelector);
  const { AuthToken } = useSelector(currentUserSelector);
  const handleDelete = React.useCallback((id) => {
    dispatch(deleteZonesActions({id, AuthToken}))
  }, [dispatch, deleteZonesActions]);
  const handleUpdate = React.useCallback((id) => {
    const zone = zones.find((i) => i.id === id);
    dispatch(setCurrentZoneActions({ ...zone, isEditable: true }));
  }, [zones]);

  const handleClick = React.useCallback((id) => {
    const zone = zones.find((i) => i.id === id);
    dispatch(setCurrentZoneActions(zone));
  },[zones, dispatch, setCurrentZoneActions]);
  const [ searchValue , setSearchValue] = React.useState('');
  // const handleSearch = React.useCallback((e) => {
  // }, [searchValue]);

  React.useEffect(() => {
    dispatch(getZonesActions({AuthToken}));
  }, []);
  React.useEffect(() => {
    dispatch(searchZonesActions(searchValue));
  }, [searchValue])

  return (
    <div className="my-garage-zone-form-wrapper">
      <ElloInput placeholder="Поиск по зонам" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} suffix={<SearchOutlined />} />
      <ZoneItems
        items={zones}
        onClick={handleClick}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        searchValue={searchValue}
      />
    </div>
  );
}

export default FormContent;
