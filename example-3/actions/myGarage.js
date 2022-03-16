import { createRoutine } from 'redux-saga-routines';
import { createAction } from '@reduxjs/toolkit';

export const getZonesActions = createRoutine('myGarage/GET_ZONES');
export const updateZonesActions = createRoutine('myGarage/PUT_ZONE');
export const deleteZonesActions = createRoutine('myGarage/DELETE_ZONE');
export const createZonesActions = createRoutine('myGarage/CREATE_ZONES');
export const searchZonesActions = createRoutine('myGarage/SEARCH_ZONES');
export const setCurrentZoneActions = createRoutine('myGarage/SET_CURRENT_ZONE');
export const setVisibilityModalZonesActions = createRoutine(
  'myGarage/SET_VISIBILITY_MODAL_ZONE'
);

// //drivers actions
export const getDriversActions = createRoutine('myGarage/GET_DRIVERS');
export const deleteDriversActions = createRoutine('myGarage/DELETE_DRIVER');
export const createDriverActions = createRoutine('myGarage/CREATE_DRIVER');
export const getDriverForEditActions = createRoutine(
  'myGarage/GET_DRIVER_FOR_EDIT'
);
export const editDriverActions = createRoutine('myGarage/EDIT_DRIVER');
export const blockDriversActions = createRoutine('myGarage/BLOCK_DRIVER');
export const addDriverModalActions = createRoutine('myGarage/ADD_DRIVER_MODAL');
export const editDriverModalActions = createRoutine(
  'myGarage/EDIT_DRIVER_MODAL'
);
export const sendToDriverInviteToAppModalActions = createRoutine(
  'myGarage/SEND_TO_DRIVER_INVITE_TO_APP_MODAL'
);
export const sendToDriverInviteToAppActions = createRoutine(
  'myGarage/SEND_TO_DRIVER_INVITE_TO_APP'
);
export const resetDriverPasswordActions = createRoutine(
  'myGarage/RESET_DRIVER_PASSWORD'
);
export const resetDriverPasswordModalActions = createRoutine(
  'myGarage/RESET_DRIVER_PASSWORD_MODAL'
);

// vehicles actions
export const createVehicleActions = createRoutine('myGarage/CREATE_VEHICLE');
export const getVehiclesActions = createRoutine('myGarage/GET_VEHICLE');
export const deleteVehiclesActions = createRoutine('myGarage/DELETE_VEHICLE');
export const getVehicleForEditActions = createRoutine(
  'myGarage/GET_VEHICLE_FOR_EDIT'
);
export const editVehicleActions = createRoutine('myGarage/EDIT_VEHICLE');
export const addVehicleModalActions = createRoutine(
  'myGarage/ADD_VEHICLE_MODAL'
);
export const editVehicleModalActions = createRoutine(
  'myGarage/EDIT_VEHICLE_MODAL'
);
export const frontPageAddVehicleModalActions = createRoutine(
  'myGarage/FRONT_PAGE_ADD_VEHICLE_MODAL'
);

// rates actions
export const createRateActions = createRoutine('myGarage/CREATE_RATE');
export const searchRatesActions = createRoutine('myGarage/SEARCH_RATE');
export const getRatesActions = createRoutine('myGarage/GET_RATE');
export const deleteRateActions = createRoutine('myGarage/DELETE_RATE');

// modal actions
export const handleAddCarModal = createAction('myGarage/HANDLE_ADD_CAR_MODAL');
