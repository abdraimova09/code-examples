/* eslint-disable */
import { call, put, takeLatest } from 'redux-saga/effects';

import { BestDeals } from '../api/bestDeals';
import { fetchCarsActions, fetchCargosActions } from '../actions/bestDeals';
import { parseCarsFromAPI, parseCargosFromAPI } from '../utils/transformers';

function* bestDealsCarsWorker() {
  const { success, fulfill, failure } = fetchCarsActions;

  try {
    const { data } = yield call(BestDeals.getBestDealsCars);

    if (data.result) {
      const vehicleList = data.vehicleList;
      
      yield put(
        success({
          listCars: parseCarsFromAPI(vehicleList),
          error: null,
        })
      );
    } else {
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

function* bestDealsCargosWorker() {
  const { success, fulfill, failure } = fetchCargosActions;

  try {
    const { data } = yield call(BestDeals.getBestDealsCargos);

    if (data.result) {
      const orderList = data.orderList;
      
      orderList.length = 5;
      
      yield put(
        success({
          listCargos: parseCargosFromAPI(orderList),
          error: null,
        })
      );
    } else {
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

export function* bestDealsCarsWatcher() {
  yield takeLatest(fetchCarsActions.TRIGGER, bestDealsCarsWorker);
}

export function* bestDealsCargosWatcher() {
  yield takeLatest(fetchCarsActions.TRIGGER, bestDealsCargosWorker);
}
