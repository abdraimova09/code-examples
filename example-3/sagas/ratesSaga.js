import { call, put, takeLatest } from 'redux-saga/effects';

import { MyGarage } from '../api/myGarage';
import {
  getRatesActions,
  createRateActions,
  deleteRateActions,
} from '../actions/myGarage';
import { parseRatesFromAPI } from '../utils/transformers';

export function* getRatesWatcher() {
  yield takeLatest(getRatesActions.TRIGGER, getRatesWorker);
}

function* getRatesWorker(action) {
  const { AuthToken } = action.payload;
  const { success, fulfill, failure } = getRatesActions;
  try {
    const { data } = yield call(MyGarage.getRates, AuthToken);
    if (data.result) {
      const ratesList = data.vehicleTariffList;

      yield put(
        success({
          ratesList: parseRatesFromAPI(ratesList),
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

export function* createRateWatcher() {
  yield takeLatest(createRateActions.TRIGGER, createRatesWorker);
}

function* createRatesWorker(action) {
  const { success, fulfill, failure } = createRateActions;
  const { rate, AuthToken } = action.payload;
  try {
    const { data } = yield call(MyGarage.createRate, { rate, AuthToken });
    if (data.result) {
      yield put(
        success({
          error: null,
        })
      );
      yield call(getRatesWorker, { payload: { AuthToken: AuthToken } });
    } else {
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

export function* deleteRateWatcher() {
  yield takeLatest(deleteRateActions.TRIGGER, deleteRatesWorker);
}

function* deleteRatesWorker(action) {
  const { success, fulfill, failure } = deleteRateActions;
  const { AuthToken, id } = action.payload;
  try {
    const { data } = yield call(MyGarage.deleteRates, { AuthToken, id });
    if (data.result) {
      yield put(
        success({
          error: null,
          id,
        })
      );
      yield call(getRatesWorker, { payload: { AuthToken: AuthToken } });
    } else {
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}
