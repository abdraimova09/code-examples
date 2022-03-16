import { defineModule } from '@core';
import CarsContent from '../components/CarsContent';
import {
  addVehicleModalWatcher,
  createVehicleWatcher,
  deleteVehiclesWatcher,
  editVehicleModalWatcher,
  frontPageAddVehicleModalWatcher,
  getVehicleForEditWatcher,
  getVehiclesWatcher,
} from '../sagas/vehiclesSaga';

export default defineModule({
  title: 'Автомобили',
  path: '/vehicles',
  component: CarsContent,
  sagas: [
    getVehicleForEditWatcher(),
    addVehicleModalWatcher(),
    editVehicleModalWatcher(),
    createVehicleWatcher(),
    getVehiclesWatcher(),
    deleteVehiclesWatcher(),
    frontPageAddVehicleModalWatcher(),
  ],
  inScope: ['myGarage', 'siderNav'],
  useScope: ['myGarageVehicles'],
});
