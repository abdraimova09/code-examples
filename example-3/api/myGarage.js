/* eslint-disable no-undef */
import { apiInstance } from '@core/api/instance';
import querystring from 'querystring';

export const MyGarage = {
  //zone's funtions
  getZones: function (AuthToken) {
    const api = apiInstance();
    return api.post(`/getZoneList?token=${AuthToken}`);
  },
  createZone: function ({ zone, AuthToken }) {
    const api = apiInstance();
    return api.post(`/createZone?token=${AuthToken}`, {
      zone,
    });
  },
  deleteZone: function ({ id, AuthToken }) {
    const api = apiInstance();
    return api.post(`/deleteZone?token=${AuthToken}`, {
      ID: id,
    });
  },

  // drivers actions
  getDrivers: function (AuthToken) {
    const api = apiInstance();
    return api.post(`/getDriverList?token=${AuthToken}`);
  },

  deleteDrivers: function ({ id, AuthToken }) {
    const api = apiInstance();
    return api.post(`/deleteDriver?token=${AuthToken}`, `ID=${id}`);
  },
  createDriver: function ({ AuthToken, driver }) {
    const api = apiInstance();
    return api.post(
      `/createDriver?token=${AuthToken}`,
      querystring.stringify(driver)
    );
  },
  blockDrivers: function ({ id, AuthToken }) {
    const api = apiInstance();
    return api.post(`/blockUser?token=${AuthToken}`, `ID=${id}`);
  },
  sendToDriverInviteToApp: function ({ id, AuthToken }) {
    const api = apiInstance();
    return api.post(`/sendExpeditorAppLink?token=${AuthToken}`, `UserID=${id}`);
  },
  resetDriverPassword: function ({ id, AuthToken }) {
    const api = apiInstance();
    return api.post(
      `/resetExpeditorPassword?token=${AuthToken}`,
      `UserID=${id}`
    );
  },
  //vehicles actions
  createVehicle: function ({ vehicle, AuthToken }) {
    const api = apiInstance();
    return api.post(
      `/createVehicle?token=${AuthToken}`,
      querystring.stringify(vehicle)
    );
  },
  getVehicles: function (AuthToken) {
    const api = apiInstance();
    return api.post(`/getVehicleList?token=${AuthToken}`);
  },
  deleteVehicles: function ({ id, AuthToken }) {
    const api = apiInstance();
    return api.post(`/deleteVehicle?token=${AuthToken}`, `ID=${id}`);
  },

  //rates actions
  createRate: function ({ rate, AuthToken }) {
    const api = apiInstance();
    return api.post(
      `/createVehicleTariff?token=${AuthToken}`,
      querystring.stringify({
        'vehicletariff[VehicleTariff][Name]': rate.name,
        'vehicletariff[VehicleTariff][ID]': rate.id,
        'vehicletariff[RoutePriceFormula][Clients]':
          rate.routePriceFormula.Clients,
        'vehicletariff[RoutePriceFormula][Distance]':
          rate.routePriceFormula.Distance,
        'vehicletariff[RoutePriceFormula][Duration]':
          rate.routePriceFormula.Duration,
      })
    );
  },
  getRates: function (AuthToken) {
    const api = apiInstance();
    return api.post(`/getVehicleTariffList?token=${AuthToken}`);
  },
  deleteRates: function ({ AuthToken, id }) {
    const api = apiInstance();
    return api.post(`/deleteVehicleTariff?token=${AuthToken}`, `ID=${id}`);
  },
};
