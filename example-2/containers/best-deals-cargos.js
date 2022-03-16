import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CargoItems from '../components/CargoItems';
import { fetchCargosActions } from '../actions/bestDeals';
import { bestCargosSelector } from '../selectors/bestDeals';

function BestDealsCargosContainer() {
  const dispatch = useDispatch();
  const items = useSelector(bestCargosSelector);

  React.useEffect(() => {
    dispatch(fetchCargosActions());
  }, []);

  return <CargoItems items={items} />;
}

export default BestDealsCargosContainer;
