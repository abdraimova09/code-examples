import { call, put, takeLatest } from 'redux-saga/effects';

import { MyGarage } from '../api/myGarage';
import {
  createVehicleActions,
  getVehiclesActions,
  deleteVehiclesActions,
  getVehicleForEditActions,
  editVehicleActions,
  addVehicleModalActions,
  editVehicleModalActions,
  frontPageAddVehicleModalActions,
} from '../actions/myGarage';

export function* createVehicleWatcher() {
  yield takeLatest(createVehicleActions.TRIGGER, createVehicleWorker);
}

function* createVehicleWorker(action) {
  const { success, failure, fulfill } = createVehicleActions;
  let { vehicle, AuthToken } = action.payload;
  try {
    const { data } = yield call(MyGarage.createVehicle, { vehicle, AuthToken });
    if (data.result) {
      yield put(
        success({
          error: null,
          loading: false,
        })
      );
      yield call(getVehiclesWorker, { payload: { AuthToken: AuthToken } });
      yield call(addVehicleModalWorker, { payload: false });
      yield call(frontPageAddVehicleModalWorker, { payload: false });
    } else {
      console.log('create vehicle error', data.error);
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}
export function* getVehiclesWatcher() {
  yield takeLatest(getVehiclesActions.TRIGGER, getVehiclesWorker);
}

function* getVehiclesWorker(action) {
  let { AuthToken } = action.payload;
  const { success, fulfill, failure } = getVehiclesActions;
  try {
    const { data } = yield call(MyGarage.getVehicles, AuthToken);
    if (data.result) {
      yield put(
        success({
          vehiclesList: data.vehicleList,
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
export function* deleteVehiclesWatcher() {
  yield takeLatest(deleteVehiclesActions.TRIGGER, deleteVehiclesWorker);
}

function* deleteVehiclesWorker(action) {
  let { id, AuthToken } = action.payload;
  const { success, fulfill, failure } = deleteVehiclesActions;
  try {
    const { data } = yield call(MyGarage.deleteVehicles, { id, AuthToken });
    if (data.result) {
      alert(data.result);
      yield put(
        success({
          error: null,
        })
      );
      yield call(getVehiclesWorker, { payload: { AuthToken: AuthToken } });
    } else {
      yield put(failure(data.error));
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}
//getOne for edit
export function* getVehicleForEditWatcher() {
  yield takeLatest(getVehicleForEditActions.TRIGGER, getVehicleForEditWorker);
}

function* getVehicleForEditWorker(action) {
  let id = action.payload;
  const { success, fulfill, failure } = getVehicleForEditActions;
  try {
    const { data } = yield call(MyGarage.getVehicleForEdit, id);
    if (data.result === true) {
      yield put(
        success({
          vehicleForEdit: data.vehicleList[0],
          error: false,
        })
      );
      yield put(
        success({
          vehicleForEdit: data.vehicleList[0],
          error: false,
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
export function* editVehicleWatcher() {
  yield takeLatest(editVehicleActions.TRIGGER, editVehicleWorker);
}

function* editVehicleWorker(action) {
  const { success, failure, fulfill } = editVehicleActions;
  let { vehicle, AuthToken } = action.payload;
  try {
    const { data } = yield call(MyGarage.createVehicle, { vehicle, AuthToken });
    if (data.result) {
      yield put(
        success({
          error: null,
          loading: false,
        })
      );
      yield call(getVehiclesWorker, { payload: { AuthToken: AuthToken } });
    } else {
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

export function* addVehicleModalWatcher() {
  yield takeLatest(addVehicleModalActions.TRIGGER, addVehicleModalWorker);
}

function* addVehicleModalWorker(action) {
  const { success } = addVehicleModalActions;
  try {
    yield put(success(action.payload));
  } catch (error) {
    console.error(error);
  }
}

export function* editVehicleModalWatcher() {
  yield takeLatest(editVehicleModalActions.TRIGGER, editVehicleModalWorker);
}

function* editVehicleModalWorker(action) {
  const { success } = editVehicleModalActions;
  try {
    yield put(success(action.payload));
  } catch (error) {
    console.error(error);
  }
}

function* frontPageAddVehicleModalWorker(action) {
  const { success } = frontPageAddVehicleModalActions;
  try {
    yield put(success(action.payload));
  } catch (error) {
    console.error(error);
  }
}

export function* frontPageAddVehicleModalWatcher() {
  yield takeLatest(
    frontPageAddVehicleModalActions.TRIGGER,
    frontPageAddVehicleModalWorker
  );
}
