import { call, put, takeLatest } from 'redux-saga/effects';

import { MyGarage } from '../api/myGarage';
import {
  getZonesActions,
  createZonesActions,
  deleteZonesActions,
  setVisibilityModalZonesActions,
} from '../actions/myGarage';
import { parseZonesFromAPI } from '../utils/transformers';

export function* getZonesWatcher() {
  yield takeLatest(getZonesActions.TRIGGER, getZonesWorker);
}

function* getZonesWorker(action) {
  const { AuthToken } = action.payload;
  const { success, fulfill, failure } = getZonesActions;

  try {
    const { data } = yield call(MyGarage.getZones, AuthToken);

    if (data.result) {
      const zoneList = data.zoneList;

      yield put(
        success({
          zones: parseZonesFromAPI(zoneList),
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

export function* createZoneWatcher() {
  yield takeLatest(createZonesActions.TRIGGER, createZonesWorker);
}

function* createZonesWorker(action) {
  const { success, fulfill, failure } = createZonesActions;
  const { zone, AuthToken } = action.payload;
  try {
    const { data } = yield call(MyGarage.createZone, { zone, AuthToken });
    if (data.result) {
      yield put(
        success({
          error: null,
          newZone: zone,
        })
      );
      yield call(getZonesWorker, { payload: { AuthToken: AuthToken } });
    } else {
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

export function* deleteZoneWatcher() {
  yield takeLatest(deleteZonesActions.TRIGGER, deleteZonesWorker);
}

function* deleteZonesWorker(action) {
  const { success, fulfill, failure } = deleteZonesActions;
  const { id, AuthToken } = action.payload;
  try {
    const { data } = yield call(MyGarage.deleteZone, { id, AuthToken });
    if (data.result) {
      yield put(
        success({
          error: null,
          id,
        })
      );
      yield call(getZonesWorker, { payload: { AuthToken: AuthToken } });
    } else {
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

export function* setVisibilityModalZoneWatcher() {
  yield takeLatest(
    setVisibilityModalZonesActions.TRIGGER,
    setVisibilityModalZonesWorker
  );
}

function* setVisibilityModalZonesWorker(action) {
  const { success, fulfill } = setVisibilityModalZonesActions;
  const flag = action.payload;

  try {
    yield put(
      success({
        isVisibleZoneModal: flag,
        error: null,
      })
    );
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}
