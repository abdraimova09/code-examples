import { createSelector } from 'reselect';

import { borderPointsToPolygon } from '../utils/transformers';

export const filteredZonesSelector = createSelector(
  (state) => state.MyGarage.filterData,
  (state) => state.MyGarage.zones,
  (filterData, zones) => {
    if (filterData?.length)
      return zones.filter((item) => item.name.includes(filterData));

    return zones;
  }
);

export const isVisibleZoneModalSelector = createSelector(
  (state) => state.MyGarage.isVisibleZoneModal,
  (flag) => flag
);

export const zonesSelector = createSelector(filteredZonesSelector, (list) => {
  return list;
});

export const borderPointsSelector = createSelector(
  filteredZonesSelector,
  (list) =>
    list.map((i) => {
      return {
        id: i.id,
        polygons: borderPointsToPolygon(i.borderPoints),
      };
    })
);

export const currentZoneSelector = createSelector(
  (state) => state.MyGarage.currentZone,
  (currentZone) => currentZone
);

export const loadingSelector = createSelector(
  (state) => state.MyGarage.loading,
  (flag) => flag
);

export const errorSelector = createSelector(
  (state) => state.MyGarage.error,
  (flag) => flag
);

export const driversListSelector = createSelector(
  (state) => state.MyGarage.driversList,
  (flag) => flag
);

export const vehiclesListSelector = createSelector(
  (state) => state.MyGarage.vehiclesList,
  (flag) => flag
);

export const driverForEditSelector = createSelector(
  (state) => state.MyGarage.driverForEdit,
  (flag) => flag
);

export const vehicleForEditSelector = createSelector(
  (state) => state.MyGarage.vehicleForEdit,
  (flag) => flag
);

export const ratesListSelector = createSelector(
  (state) => state.MyGarage.ratesList,
  (flag) => flag
);

export const addDriverModalSelector = createSelector(
  (state) => state.MyGarage.addDriverModal,
  (flag) => flag
);

export const editDriverModalSelector = createSelector(
  (state) => state.MyGarage.editDriverModal,
  (flag) => flag
);

export const addCarModalSelector = createSelector(
  (state) => state.MyGarage.addCarModal,
  (addCarModal) => addCarModal
);
export const addVehicleModalSelector = createSelector(
  (state) => state.MyGarage.addVehicleModal,
  (flag) => flag
);

export const editVehicleModalSelector = createSelector(
  (state) => state.MyGarage.editVehicleModal,
  (flag) => flag
);

export const frontPageAddVehicleModalSelector = createSelector(
  (state) => state.MyGarage.frontPageAddVehicleModal,
  (flag) => flag
);

export const sendToDriverInviteToAppModalSelector = createSelector(
  (state) => state.MyGarage.sendToDriverInviteToAppModal,
  (flag) => flag
);

export const resetDriverPasswordModalSelector = createSelector(
  (state) => state.MyGarage.resetDriverPasswordModal,
  (flag) => flag
);
