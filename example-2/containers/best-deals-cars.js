import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CarItems from '../components/CarItems';
import { fetchCarsActions } from '../actions/bestDeals';
import { bestCarsSelector } from '../selectors/bestDeals';

function BestDealsCarsContainer() {
  const dispatch = useDispatch();
  const items = useSelector(bestCarsSelector);

  React.useEffect(() => {
    dispatch(fetchCarsActions());
  }, []);

  return <CarItems items={items} />;
}

export default BestDealsCarsContainer;
