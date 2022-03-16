import { createReducer } from '@reduxjs/toolkit';

import { fetchCarsActions, fetchCargosActions } from '../actions/bestDeals';
import { bestDealsInitialState } from '../store/bestDeals';

const BestDeals = createReducer(bestDealsInitialState, {
  [fetchCarsActions.SUCCESS]: (state, action) => {
    const { listCars } = action.payload;

    state.error = null;
    return { ...state, listCars };
  },
  [fetchCarsActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [fetchCarsActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [fetchCarsActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [fetchCarsActions.FULFILL]: (state) => {
    state.loading = false;
  },

  [fetchCargosActions.SUCCESS]: (state, action) => {
    const { listCargos } = action.payload;

    state.error = null;
    return { ...state, listCargos };
  },
  [fetchCargosActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [fetchCargosActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [fetchCargosActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [fetchCargosActions.FULFILL]: (state) => {
    state.loading = false;
  },
});

export default BestDeals;
