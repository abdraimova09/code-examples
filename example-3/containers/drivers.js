import { defineModule } from '@core';
import DriversContent from '../components/DriversContent';
import {
  addDriverModalWatcher,
  blockDriversWatcher,
  createDriverWatcher,
  deleteDriversWatcher,
  editDriverModalWatcher,
  editDriverWatcher,
  getDriversWatcher,
  modalResetDriverPasswordWatcher,
  modalSendToDriverInviteToAppWatcher,
  resetDriverPasswordWatcher,
  sendToDriverInviteToAppWatcher,
} from '../sagas/driversSaga';

export default defineModule({
  title: 'Водители',
  path: '/drivers',
  component: DriversContent,
  sagas: [
    getDriversWatcher(),
    deleteDriversWatcher(),
    createDriverWatcher(),
    editDriverWatcher(),
    blockDriversWatcher(),
    addDriverModalWatcher(),
    editDriverModalWatcher(),
    sendToDriverInviteToAppWatcher(),
    modalSendToDriverInviteToAppWatcher(),
    resetDriverPasswordWatcher(),
    modalResetDriverPasswordWatcher(),
  ],
  inScope: ['myGarage', 'siderNav'],
  useScope: ['myGarageDrivers'],
});
