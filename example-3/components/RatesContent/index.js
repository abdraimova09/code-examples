import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ElloRow, ElloLoader } from '@components';
import TopComponent from './components/TopComponent';
import List from './components/List';
import {
  createRateActions,
  deleteRateActions,
  getRatesActions,
} from '../../actions/myGarage';
import { loadingSelector, ratesListSelector } from '../../selectors/myGarage';

import './styles.less';
import { currentUserSelector } from '../../../current-user/selectors/auth';

function RatesContent() {
  const dispatch = useDispatch();
  const [currentRate, setCurrentRate] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [currentRates, setCurrentRates] = useState([]);
  const rates = useSelector(ratesListSelector);
  const isLoading = useSelector(loadingSelector);
  const { AuthToken } = useSelector(currentUserSelector);
  const handleAddRate = useCallback((values) => {
    let rate = {
      name: values.name,
      id: values.id,
      routePriceFormula: {
        Clients: +values.costCargo,
        Distance: +values.costDistance,
        Duration: +values.costTime,
      },
    };
    setCurrentRate(null);
    setSearchValue('');
    dispatch(createRateActions({ rate, AuthToken }));
  }, []);
  const handleResetCurrentItem = useCallback(() => {
    setCurrentRate(null);
  }, []);
  const handleSearch = useCallback(
    (searchValue) => {
      setSearchValue(searchValue);
      setCurrentRate(null);
      setCurrentRates(
        rates.filter((i) =>
          i.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    },
    [rates]
  );
  const handleDeleteRate = useCallback((id) => {
    setSearchValue('');
    dispatch(deleteRateActions({ AuthToken, id }));
  }, []);
  // eslint-disable-next-line no-unused-vars
  const handleUpdateRate = useCallback(
    (id) => {
      const currentRate = rates.find((i) => i.id === id);
      setSearchValue('');
      setCurrentRate(currentRate);
    },
    [rates, setCurrentRate]
  );

  useEffect(() => {
    dispatch(getRatesActions({ AuthToken }));
  }, []);

  useEffect(() => {
    setCurrentRates(rates);
  }, [rates]);

  return (
    <ElloRow className="my-garage-page-container my-garage-rates-wrapper right m-2 mt-4">
      <TopComponent
        currentItem={currentRate}
        resetCurrentItem={handleResetCurrentItem}
        onAddRate={handleAddRate}
        searchValue={searchValue}
        onSearch={handleSearch}
      />
      {searchValue != '' && currentRates.length < 1 ? (
        <span className="ml-3">
          Нет тарифа по запросу &quot;{searchValue}&quot;
        </span>
      ) : null}
      <List
        items={currentRates}
        onDelete={handleDeleteRate}
        onUpdate={handleUpdateRate}
      />
      {isLoading && <ElloLoader />}
    </ElloRow>
  );
}

export default RatesContent;
