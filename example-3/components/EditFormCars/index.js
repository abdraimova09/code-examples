/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import moment from 'moment';

import { ElloTypographyTitle, ElloForm } from '@components';

import Row1 from './components/Row1';
import Row2 from './components/Row2';
import Row3 from './components/Row3';
import Row4 from './components/Row4';
import Row5 from './components/Row5';
import Row6 from './components/Row6';

import { editVehicleActions, editVehicleModalActions, getRatesActions, getZonesActions } from '../../actions/myGarage';
import { driversListSelector, errorSelector, ratesListSelector, vehicleForEditSelector, zonesSelector } from '../../selectors/myGarage';
import { currentUserSelector } from '../../../current-user/selectors/auth';
import Row7 from './components/Row7';
import Row8 from './components/Row8';
import Row9 from './components/Row9';

function EditFormCars({vehicleForEdit}) {
  const driversList = useSelector(driversListSelector);
  const ratesList = useSelector(ratesListSelector);
  const zonesList = useSelector(zonesSelector);
  const error = useSelector(errorSelector);
  const { AuthToken } = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [workingZones, setWorkingZones] = useState(null);
  function buildObjectForForm (){
      let newObj = {
        forMarket: +vehicleForEdit.ForMarket,
        model: vehicleForEdit.Model,
        yearOfIssue: Number(JSON.parse(vehicleForEdit.VehicleInfo).Year),
        typeOfCar: JSON.parse(vehicleForEdit.VehicleInfo).VehicleType,
        typeOfLoad: JSON.parse(vehicleForEdit.VehicleInfo).LoadType,
        garageAddress: vehicleForEdit.StartDepotName,
        stateNumber: vehicleForEdit.RegNumber,
        weightCapability: vehicleForEdit.MaxMass / 1000,
        maxVolume: vehicleForEdit.MaxVolume,
        vinNumber: JSON.parse(vehicleForEdit.VehicleInfo).VIN,
        certificateNumber: JSON.parse(vehicleForEdit.VehicleInfo).RegCertNum,
        certificateIssueDate: moment(JSON.parse(vehicleForEdit.VehicleInfo).RegCertDate, 'YYYY-MM-DD'),
        driver: vehicleForEdit.DriverName,
        tariff: vehicleForEdit.VehicleTariffName,
        parameters: {
        length: vehicleForEdit.MaxUnitLength / 1000,
        width: vehicleForEdit.MaxUnitWidth / 1000,
        height: vehicleForEdit.MaxUnitHeight / 1000,
        },
        workingTime: {
          startWorking:  moment(JSON.parse(vehicleForEdit?.Timeline)?.Name.substring(
            JSON.parse(vehicleForEdit.Timeline)?.Name.lastIndexOf("с") + 1, 
            JSON.parse(vehicleForEdit.Timeline)?.Name.lastIndexOf("д")
          ), 'HH:mm A'),
          endWorking:  moment(JSON.parse(vehicleForEdit.Timeline)?.Name.substring(
            JSON.parse(vehicleForEdit.Timeline)?.Name.lastIndexOf("д") + 2, 
            JSON.parse(vehicleForEdit.Timeline)?.Name.length
          ), 'HH:mm A'),
        },
      }
      console.log("newObj", newObj);
      setWorkingZones(vehicleForEdit.Zone? vehicleForEdit.Zone : []);
      form.setFieldsValue(newObj);
  }
  function onFinish (values) {
    console.log('edit vaaals',  values);
    let vehicle = {
          "vehicle[Vehicle][ForMarket]": values.forMarket, 
          "vehicle[Vehicle][Model]": values.model,
          "vehicle[Vehicle][RegNumber]": values.stateNumber,
          "vehicle[Vehicle][DriverID]": +vehicleForEdit.DriverID == 0 ? null : +vehicleForEdit.DriverID,
          "vehicle[Vehicle][VehicleCode]": vehicleForEdit.VehicleCode,
          "vehicle[Vehicle][Name]": null,
          "vehicle[Vehicle][Priority]": null,
          "vehicle[Vehicle][UseMode]": null,
          "vehicle[Vehicle][RouteColor]": null,
          "vehicle[Vehicle][TakeOnlyOrdersInZones]": null,
          "vehicle[Info][Year]": values.yearOfIssue === 0 ? null: values.yearOfIssue,
          "vehicle[Info][VIN]": values.vinNumber,
          "vehicle[Info][RegCertNum]": values.certificateNumber,
          "vehicle[Info][RegCertDate]": values.certificateIssueDate._d.getFullYear() +
          '-' + values.certificateIssueDate._d.getMonth() + '-' + values.certificateIssueDate._d.getDate(),
          "vehicle[Info][VehicleType]": values.typeOfCar,
          "vehicle[Info][LoadType]": values.typeOfLoad,
          "vehicle[Info][IsTemplate]": values.templateName ? 1 : 0,
          "vehicle[Info][TemplateName]": values.templateName ? values.templateName: null,
          "vehicle[VehicleProfile][MaxMass]": values.weightCapability * 1000,
          "vehicle[VehicleProfile][MaxVolume]": +values.maxVolume,
          "vehicle[VehicleProfile][MaxUnitLength]": +values.parameters.length * 1000,
          "vehicle[VehicleProfile][MaxUnitWidth]": +values.parameters.width * 1000,
          "vehicle[VehicleProfile][MaxUnitHeight]": +values.parameters.height * 1000,
          "vehicle[VehicleProfile][Name]": `${ +values.weightCapability}т ${+values.maxVolume}м3 ${+values.parameters.length}х${+values.parameters.width}x${+values.parameters.height}`,
          "vehicle[VehicleTimeline][MinStartTime]": moment(values.workingTime.startWorking._d.getHours() + ':' + values.workingTime.startWorking._d.getMinutes(), "h:m").format("HH:mm"),
          "vehicle[VehicleTimeline][MaxEndTime]": moment(values.workingTime.endWorking._d.getHours() + ':' + values.workingTime.endWorking._d.getMinutes(), "h:m").format("HH:mm"),
          "vehicle[VehicleTimeline][Name]": `с ${moment(values.workingTime.startWorking._d.getHours() + ':' + values.workingTime.startWorking._d.getMinutes(), "h:m").format("HH:mm")} до ${moment(values.workingTime.endWorking._d.getHours() + ':' + values.workingTime.endWorking._d.getMinutes(), "h:m").format("HH:mm")}`,
          "vehicle[StartDepot][Name]": values.garageAddress?.value ? values.garageAddress.value : vehicleForEdit.StartDepotName ,
          "vehicle[StartDepot][Latitude]": values.garageAddress?.data?.geo_lat ? values.garageAddress.data.geo_lat: vehicleForEdit.StartDepotLatitude,
          "vehicle[StartDepot][Longitude]": values.garageAddress?.data?.geo_lon ? values.garageAddress.data.geo_lon : vehicleForEdit.StartDepotLongitude,
          "vehicle[StartDepot][DepotTypeID]": null,
          "vehicle[StartDepot][DepotCode]": null,
          "vehicle[ZoneVehicle][Zone]": workingZones? workingZones: null,
          "vehicle[VehicleTariff][Name]": values.tariff,
          "vehicle[VehicleTracker][IMEI]": values.IMEI ? values.IMEI: null,
          "vehicle[VehicleRestriction][Restriction]": vehicleForEdit?.Restriction,
        }
        console.log(vehicle);
      dispatch(editVehicleActions({AuthToken, vehicle}));
  }
  useEffect(() => {
    dispatch(getRatesActions({AuthToken}));
    dispatch(getZonesActions({AuthToken}));
  }, []);
  useEffect(() => {
    buildObjectForForm ()
  }, [vehicleForEdit]);
  return (
    <div className="d-flex flex-fill flex-column justify-content-start align-content-start my-garage-add-form-wrapper">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '894px',
        }}
      > <ElloTypographyTitle level={5}>
      Автомобиль 
    </ElloTypographyTitle>
        <div onClick={() => dispatch(editVehicleModalActions(false))}>
          <ReactSVG
            style={{ width: '50px' }}
            className="svg-container"
            src={'/assets/icons/close.svg'}
          />
        </div>
      </div>
      
      <ElloForm form={form} onFinish={onFinish} onValuesChange={(arg1, arg2) => {
        console.log('form values change', arg1, arg2);
      }}>
        {error ? <ElloAlert message={error} type="error" /> : null}
        <br />
        <Row1 />
        <Row2 />
        <Row3 />
        <Row4 />
        <Row5 />
        <Row7 vehicleForEdit={vehicleForEdit} ratesList={ratesList} />
        <Row8 driversList={driversList}/>
        <Row9 zonesList={zonesList} workingZones={workingZones} setWorkingZones={setWorkingZones}/>
        <Row6 />
      </ElloForm>
    </div>
  );
}

export default EditFormCars;
