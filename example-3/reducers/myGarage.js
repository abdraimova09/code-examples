import { createReducer } from '@reduxjs/toolkit';

import {
  getZonesActions,
  createZonesActions,
  deleteZonesActions,
  setVisibilityModalZonesActions,
  setCurrentZoneActions,
  searchZonesActions,
  createVehicleActions,
  getVehiclesActions,
  deleteVehiclesActions,
  createRateActions,
  searchRatesActions,
  getRatesActions,
  getVehicleForEditActions,
  addVehicleModalActions,
  editVehicleModalActions,
  getDriversActions,
  deleteDriversActions,
  createDriverActions,
  getDriverForEditActions,
  editDriverActions,
  blockDriversActions,
  addDriverModalActions,
  editDriverModalActions,
  handleAddCarModal,
  frontPageAddVehicleModalActions,
  sendToDriverInviteToAppActions,
  sendToDriverInviteToAppModalActions,
  resetDriverPasswordActions,
  resetDriverPasswordModalActions,
} from '../actions/myGarage';
import { myGarageInitialState } from '../store/myGarage';

const MyGarage = createReducer(myGarageInitialState, {
  //open-close add driver form
  [addDriverModalActions.SUCCESS]: (state, action) => {
    return {
      ...state,
      addDriverModal: action.payload,
      error: null,
    };
  },
  //open-close edit driver form
  [editDriverModalActions.SUCCESS]: (state, action) => {
    return {
      ...state,
      editDriverModal: action.payload,
      error: null,
    };
  },
  //open-close modal send invite to driver form
  [sendToDriverInviteToAppModalActions.SUCCESS]: (state, action) => {
    return {
      ...state,
      sendToDriverInviteToAppModal: action.payload,
    };
  },
  //open-close modal reset driver's password form
  [resetDriverPasswordModalActions.SUCCESS]: (state, action) => {
    return {
      ...state,
      resetDriverPasswordModal: action.payload,
    };
  },

  //getDriversActions start
  [getDriversActions.SUCCESS]: (state, action) => {
    const { driversList } = action.payload;
    return { ...state, loading: false, driversList };
  },
  [getDriversActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getDriversActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getDriversActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //getDriversActions end

  //deleteDriversActions start
  [deleteDriversActions.SUCCESS]: (state) => {
    return { ...state, loading: false, error: null };
  },
  [deleteDriversActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [deleteDriversActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [deleteDriversActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //deleteDriversActions end

  //blockUser actions start
  [blockDriversActions.SUCCESS]: (state) => {
    return { ...state, loading: false, error: null };
  },
  [blockDriversActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [blockDriversActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [blockDriversActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //blockUser end

  //sendInviteTodriver actions start
  [sendToDriverInviteToAppActions.SUCCESS]: (state) => {
    return { ...state, loading: false, error: null };
  },
  [sendToDriverInviteToAppActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [sendToDriverInviteToAppActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [sendToDriverInviteToAppActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //sendInviteTodriver end

  //reset driver's password actions start
  [resetDriverPasswordActions.SUCCESS]: (state) => {
    return { ...state, loading: false, error: null };
  },
  [resetDriverPasswordActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [resetDriverPasswordActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [resetDriverPasswordActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //reset driver's password end

  //create driver start
  [createDriverActions.SUCCESS]: (state) => {
    state.error = null;
    state.loading = false;
    return { ...state, driverForEdit: null };
  },
  [createDriverActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [createDriverActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [createDriverActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [createDriverActions.FULFILL]: (state) => {
    state.loading = false;
  },
  //create driver end
  //get driver for edit start
  [getDriverForEditActions.SUCCESS]: (state, action) => {
    const { driverForEdit } = action.payload;
    return { ...state, error: null, loading: false, driverForEdit };
  },
  [getDriverForEditActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getDriverForEditActions.TRIGGER]: (state) => {
    return { ...state, error: null, loading: true };
  },
  [getDriverForEditActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // get driver for edit end
  //edit driver start
  [editDriverActions.SUCCESS]: (state) => {
    return { ...state, driverForEdit: null, loading: false, error: null };
  },
  [editDriverActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [editDriverActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [editDriverActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [editDriverActions.FULFILL]: (state) => {
    state.loading = false;
  },
  [getZonesActions.SUCCESS]: (state, action) => {
    const { zones } = action.payload;

    state.error = null;
    return { ...state, zones };
  },
  [getZonesActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getZonesActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getZonesActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [getZonesActions.FULFILL]: (state) => {
    state.loading = false;
  },

  [createZonesActions.SUCCESS]: (state, action) => {
    const { ...newZone } = action.payload;

    state.error = null;
    return { ...state, zones: [...state.zones, { ...newZone }] };
  },
  [createZonesActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [createZonesActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [createZonesActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [createZonesActions.FULFILL]: (state) => {
    state.loading = false;
  },
  //createVehicle actions start
  [createVehicleActions.SUCCESS]: (state) => {
    return {
      ...state,
      error: null,
      loading: false,
    };
  },
  [createVehicleActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [createVehicleActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [createVehicleActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [createVehicleActions.FULFILL]: (state) => {
    state.loading = false;
  },
  //createVehicle actions end
  [deleteZonesActions.SUCCESS]: (state, action) => {
    const { id } = action.payload;

    state.error = null;
    return {
      ...state,
      zones: [...state.zones.filter((item) => item.id !== id)],
    };
  },
  [deleteZonesActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [deleteZonesActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [deleteZonesActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [deleteZonesActions.FULFILL]: (state) => {
    state.loading = false;
  },

  [setVisibilityModalZonesActions.SUCCESS]: (state, action) => {
    const flag = action.payload;

    state.error = null;
    return { ...state, isVisibleZoneModal: flag };
  },
  [setVisibilityModalZonesActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [setVisibilityModalZonesActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [setVisibilityModalZonesActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [setVisibilityModalZonesActions.FULFILL]: (state) => {
    state.loading = false;
  },

  [setCurrentZoneActions.SUCCESS]: (state, action) => {
    const zone = action.payload;
    state.error = null;
    return { ...state, currentZone: zone };
  },
  [setCurrentZoneActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [setCurrentZoneActions.TRIGGER]: (state, action) => {
    const zone = action.payload;
    state.error = null;
    return { ...state, currentZone: zone };
  },
  [setCurrentZoneActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [setCurrentZoneActions.FULFILL]: (state) => {
    state.loading = false;
  },

  [searchZonesActions.SUCCESS]: (state) => {
    state.error = null;
    return state;
  },
  [searchZonesActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [searchZonesActions.TRIGGER]: (state, action) => {
    const search = action.payload;

    state.error = null;
    return {
      ...state,
      filterData: search,
    };
  },
  [searchZonesActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [searchZonesActions.FULFILL]: (state) => {
    state.loading = false;
  },
  //open-close add vehicle form
  [addVehicleModalActions.SUCCESS]: (state, action) => {
    return {
      ...state,
      addVehicleModal: action.payload,
      error: null,
    };
  },
  [frontPageAddVehicleModalActions.SUCCESS]: (state, action) => {
    return {
      ...state,
      frontPageAddVehicleModal: action.payload,
      error: null,
    };
  },
  //open-close edit vehicle form
  [editVehicleModalActions.SUCCESS]: (state, action) => {
    return {
      ...state,
      editVehicleModal: action.payload,
      error: null,
    };
  },
  //getVehiclesActions start
  [getVehiclesActions.SUCCESS]: (state, action) => {
    const { vehiclesList } = action.payload;
    return { ...state, error: null, loading: false, vehiclesList };
  },
  [getVehiclesActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getVehiclesActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getVehiclesActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // getVehiclesActions end

  //get vehicle for edit start
  [getVehicleForEditActions.SUCCESS]: (state, action) => {
    const { vehicleForEdit } = action.payload;
    return { ...state, error: null, loading: false, vehicleForEdit };
  },
  [getVehicleForEditActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getVehicleForEditActions.TRIGGER]: (state) => {
    return { ...state, error: null, loading: true };
  },
  [getVehicleForEditActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // get vehicle for edit end
  //deleteVehicle start
  [deleteVehiclesActions.SUCCESS]: (state) => {
    state.error = null;
    return { ...state, error: null };
  },
  [deleteVehiclesActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [deleteVehiclesActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [deleteVehiclesActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //deleteVehicle end
  //create rate start
  [createRateActions.SUCCESS]: (state, action) => {
    const newRate = action.payload;
    state.error = null;
    state.loading = false;
    state.ratesList = [...state.ratesList, { ...newRate }];
  },
  [createRateActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [createRateActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [createRateActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [createRateActions.FULFILL]: (state) => {
    state.loading = false;
  },
  //create rate end

  // search rate start
  [searchRatesActions.SUCCESS]: (state) => {
    state.error = null;
    return state;
  },
  [searchRatesActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [searchRatesActions.TRIGGER]: (state, action) => {
    const search = action.payload;

    state.error = null;
    return {
      ...state,
      filterDataRates: search,
    };
  },
  [searchRatesActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [searchRatesActions.FULFILL]: (state) => {
    state.loading = false;
  },
  // search rate end

  // get rates start
  [getRatesActions.SUCCESS]: (state, action) => {
    const { ratesList } = action.payload;

    return { ...state, loading: false, ratesList };
  },
  [getRatesActions.REQUEST]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getRatesActions.TRIGGER]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [getRatesActions.FAILURE]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // get rates end
  [handleAddCarModal]: (state) => {
    state.addCarModal = !state.addCarModal;
    return state;
  },
});

export default MyGarage;
