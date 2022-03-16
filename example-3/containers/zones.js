import { defineModule } from '@core';
import ZonesContent from '../components/ZonesContent';
import {
  createZoneWatcher,
  deleteZoneWatcher,
  getZonesWatcher,
  setVisibilityModalZoneWatcher,
} from '../sagas/zonesSaga';

export default defineModule({
  title: 'Зоны',
  path: '/zones',
  component: ZonesContent,
  sagas: [
    getZonesWatcher(),
    createZoneWatcher(),
    deleteZoneWatcher(),
    setVisibilityModalZoneWatcher(),
  ],
  inScope: ['myGarage', 'siderNav'],
  useScope: ['myGarageZones'],
});
