import { defineModule } from '@core';
import BestDealsCarsContainer from './containers/best-deals-cars';
import BestDealsCargosContainer from './containers/best-deals-cargos';
import {
  bestDealsCarsWatcher,
  bestDealsCargosWatcher,
} from './sagas/bestDealsSaga';
import BestDeals from './reducers/bestDeals';

export default defineModule([
  {
    title: 'Лучшее предложение машины',
    component: BestDealsCarsContainer,
    inScope: ['bestDealsCars'],
    reducer: BestDeals,
    sagas: [bestDealsCarsWatcher()],
  },
  {
    title: 'Лучшее предложение грузы',
    component: BestDealsCargosContainer,
    inScope: ['bestDealsCargos'],
    reducer: BestDeals,
    sagas: [bestDealsCargosWatcher()],
  },
]);
