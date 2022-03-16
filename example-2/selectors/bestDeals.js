import { createSelector } from 'reselect';

export const bestCarsSelector = createSelector(
  (state) => state.BestDeals.listCars,
  (list) => list
);

export const bestCargosSelector = createSelector(
  (state) => state.BestDeals.listCargos,
  (list) => list
);
