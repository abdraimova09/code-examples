import { defineModule } from '@core';
import RatesContent from '../components/RatesContent';
import {
  createRateWatcher,
  deleteRateWatcher,
  getRatesWatcher,
} from '../sagas/ratesSaga';

export default defineModule({
  title: 'Тарифы автомобилей',
  path: '/rates',
  component: RatesContent,
  sagas: [getRatesWatcher(), deleteRateWatcher(), createRateWatcher()],
  inScope: ['myGarage', 'siderNav'],
  useScope: ['myGarageRates'],
});
