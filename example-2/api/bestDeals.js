/* eslint-disable no-undef */

import { apiInstance } from '@core/api/instance';

export const BestDeals = {
  getBestDealsCars: function () {
    const api = apiInstance();

    return api.post(
      `/getVehicleList?token=${process.env.REACT_APP_ROOT_TOKEN}`,
      {
        search: {
          latest: 5,
        },
      }
    );
  },
  getBestDealsCargos: function () {
    const api = apiInstance();

    return api.post(`/getOrderList?token=${process.env.REACT_APP_ROOT_TOKEN}`, {
      search: {
        latest: 5,
      },
    });
  },
};
