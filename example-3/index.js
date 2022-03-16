import { defineModule } from '@core';
import MyGarageContainer from './containers';
import MyGarage from './reducers/myGarage';
import DriversContent from './containers/drivers';
import VehiclesContent from './containers/vehicles';
import RatesContent from './containers/rates';
import ZonesContent from './containers/zones';
// removed additional reducers from child components, so not to create extra stores
export default defineModule([
  {
    title: 'Мой гараж',
    path: '/my-garage',
    component: MyGarageContainer,
    reducer: MyGarage,
    children: [DriversContent, VehiclesContent, RatesContent, ZonesContent],
    inScope: ['myGarage', 'siderNav'],
    useScope: [
      'myGarageDrivers',
      'myGarageVehicles',
      'myGarageZones',
      'myGarageRates',
    ],
    icon: '/assets/icons/sidebar/my-garage.svg',
  },
]);
