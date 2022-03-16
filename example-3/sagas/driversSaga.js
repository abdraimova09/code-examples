import { call, put, takeLatest } from 'redux-saga/effects';

import { MyGarage } from '../api/myGarage';
import {
  getDriversActions,
  deleteDriversActions,
  createDriverActions,
  editDriverActions,
  blockDriversActions,
  addDriverModalActions,
  editDriverModalActions,
  sendToDriverInviteToAppActions,
  sendToDriverInviteToAppModalActions,
  resetDriverPasswordActions,
  resetDriverPasswordModalActions,
} from '../actions/myGarage';

export function* addDriverModalWatcher() {
  yield takeLatest(addDriverModalActions.TRIGGER, addDriverModalWorker);
}

function* addDriverModalWorker(action) {
  const { success } = addDriverModalActions;
  try {
    yield put(success(action.payload));
  } catch (error) {
    console.error(error);
  }
}

export function* editDriverModalWatcher() {
  yield takeLatest(editDriverModalActions.TRIGGER, editDriverModalWorker);
}

function* editDriverModalWorker(action) {
  const { success } = editDriverModalActions;
  try {
    yield put(success(action.payload));
  } catch (error) {
    console.error(error);
  }
}

export function* getDriversWatcher() {
  yield takeLatest(getDriversActions.TRIGGER, getDriversWorker);
}

function* getDriversWorker(action) {
  const { success, fulfill, failure } = getDriversActions;
  let { AuthToken } = action.payload;
  try {
    const { data } = yield call(MyGarage.getDrivers, AuthToken);
    if (data.result) {
      yield put(
        success({
          driversList: data.driverList,
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

export function* deleteDriversWatcher() {
  yield takeLatest(deleteDriversActions.TRIGGER, deleteDriversWorker);
}

function* deleteDriversWorker(action) {
  let { id, AuthToken } = action.payload;
  const { success, fulfill, failure } = deleteDriversActions;
  try {
    const { data } = yield call(MyGarage.deleteDrivers, { id, AuthToken });
    if (data.result) {
      alert(data.result);
      yield put(
        success({
          error: null,
          loading: false,
        })
      );
      yield call(getDriversWorker, { payload: { AuthToken: AuthToken } });
    } else {
      alert(data.error);
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

//create driver
export function* createDriverWatcher() {
  yield takeLatest(createDriverActions.TRIGGER, createDriverWorker);
}

function* createDriverWorker(action) {
  const { failure, fulfill, success } = createDriverActions;
  let { AuthToken, driver } = action.payload;
  try {
    const data = yield call(MyGarage.createDriver, { AuthToken, driver });
    if (data.data.error) {
      alert(data.data.error);
      yield put(failure(data.data.error));
    } else {
      alert('success');
      yield put(
        success({
          error: null,
          loading: false,
        })
      );
      yield call(getDriversWorker, { payload: { AuthToken: AuthToken } });
      yield call(addDriverModalWorker, { payload: false });
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

export function* editDriverWatcher() {
  yield takeLatest(editDriverActions.TRIGGER, editDriverWorker);
}

function* editDriverWorker(action) {
  const { success, failure, fulfill } = editDriverActions;
  let { AuthToken, driver } = action.payload;
  try {
    const data = yield call(MyGarage.createDriver, { AuthToken, driver });
    if (data.data.result) {
      yield put(
        success({
          error: null,
          loading: false,
        })
      );
      yield call(getDriversWorker, { payload: { AuthToken: AuthToken } });
      yield call(editDriverModalWorker, { payload: false });
    } else if (data.data.error) {
      alert(data.data.error);
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

export function* blockDriversWatcher() {
  yield takeLatest(blockDriversActions.TRIGGER, blockDriversWorker);
}

function* blockDriversWorker(action) {
  let { id, AuthToken } = action.payload;
  const { success, fulfill, failure } = blockDriversActions;
  try {
    const { data } = yield call(MyGarage.blockDrivers, { id, AuthToken });
    if (data.result) {
      yield put(
        success({
          error: null,
          loading: false,
        })
      );
      yield call(getDriversWorker, { payload: { AuthToken: AuthToken } });
    } else {
      yield put(failure(data.error));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

export function* sendToDriverInviteToAppWatcher() {
  yield takeLatest(
    sendToDriverInviteToAppActions.TRIGGER,
    sendToDriverInviteToAppWorker
  );
}

function* sendToDriverInviteToAppWorker(action) {
  let { id, AuthToken } = action.payload;
  const { success, fulfill, failure } = sendToDriverInviteToAppActions;
  try {
    const { data } = yield call(MyGarage.sendToDriverInviteToApp, {
      id,
      AuthToken,
    });
    if (data.result) {
      yield put(
        success({
          error: null,
          loading: false,
        })
      );
      yield call(modalSendToDriverInviteToAppWorker, { payload: true });
    } else {
      yield put(failure(data.error));
      yield call(modalSendToDriverInviteToAppWorker, { payload: true });
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}

export function* modalSendToDriverInviteToAppWatcher() {
  yield takeLatest(
    sendToDriverInviteToAppModalActions.TRIGGER,
    modalSendToDriverInviteToAppWorker
  );
}

function* modalSendToDriverInviteToAppWorker(action) {
  const { success } = sendToDriverInviteToAppModalActions;
  try {
    yield put(success(action.payload));
  } catch (error) {
    console.error(error);
  }
}

export function* resetDriverPasswordWatcher() {
  yield takeLatest(
    resetDriverPasswordActions.TRIGGER,
    resetDriverPasswordWorker
  );
}

function* resetDriverPasswordWorker(action) {
  let { id, AuthToken } = action.payload;
  const { success, fulfill, failure } = resetDriverPasswordActions;
  try {
    const { data } = yield call(MyGarage.resetDriverPassword, {
      id,
      AuthToken,
    });
    if (data.result) {
      yield put(
        success({
          error: null,
          loading: false,
        })
      );
      yield call(modalResetDriverPasswordWorker, { payload: true });
    } else {
      yield put(failure(data.error));
      yield call(modalResetDriverPasswordWorker, { payload: true });
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(fulfill());
  }
}
export function* modalResetDriverPasswordWatcher() {
  yield takeLatest(
    resetDriverPasswordModalActions.TRIGGER,
    modalResetDriverPasswordWorker
  );
}

function* modalResetDriverPasswordWorker(action) {
  const { success } = resetDriverPasswordModalActions;
  try {
    yield put(success(action.payload));
  } catch (error) {
    console.error(error);
  }
}
