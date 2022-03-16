/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Form } from 'antd';

import { ElloTypographyTitle, ElloForm, ElloAlert } from '@components';

import Row1 from './components/Row1';
import Row2 from './components/Row2';
import Row3 from './components/Row3';
import Row4 from './components/Row4';
import Row5 from './components/Row5';
import Row6 from './components/Row6';

import { addVehicleModalActions, createVehicleActions, getRatesActions, getVehiclesActions, getZonesActions } from '../../actions/myGarage';
import { driversListSelector, errorSelector, ratesListSelector, zonesSelector, vehiclesListSelector} from '../../selectors/myGarage';

import './styles.less';
import { ReactSVG } from 'react-svg';
import { currentUserSelector } from '../../../current-user/selectors/auth';
import Row7 from './components/Row7';
import Row8 from './components/Row8';

function AddFormCars({visibilityButtonClose = true}) {
  const driversList = useSelector(driversListSelector);
  const ratesList = useSelector(ratesListSelector);
  const zonesList = useSelector(zonesSelector);
  const carsList = useSelector(vehiclesListSelector);
  const error = useSelector(errorSelector);
  const { AuthToken } = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [workingZones, setWorkingZones] = useState(null);
  function changeValues (arg1, arg2) {
    let values = form.getFieldsValue();
    // if(values?.parameters?.length || values?.parameters?.height || values?.parameters?.width){
    //   form.setFieldsValue({
    //     profile: null
    //   });
    // }
    console.log('vals', values);
    if(values?.parameters?.length && values?.parameters?.height && values?.parameters?.width){
      console.log('check it');
      form.setFieldsValue({
        maxVolume: values?.parameters?.length * values?.parameters?.height * values?.parameters?.width,
       });
    }else {
      form.setFieldsValue({maxVolume: 0}); 
    }
    if(values?.template){
     let templateCar =  carsList.filter((car) => (car.ID == values?.template))[0];
     console.log('temp car', templateCar, JSON.parse(templateCar.VehicleInfo));
     form.setFieldsValue({
      model: templateCar.Name,
      vinNumber: JSON.parse(templateCar?.VehicleInfo).VIN,
      certificateIssueDate: moment(JSON.parse(templateCar?.VehicleInfo).RegCertDate, 'YYYY-MM-DD'),
      certificateNumber: JSON.parse(templateCar?.VehicleInfo)?.RegCertNum? JSON.parse(templateCar?.VehicleInfo)?.RegCertNum: null,
      maxVolume:  templateCar?.MaxVolume? +templateCar.MaxVolume: null,
      parameters: {
          length: templateCar?.MaxUnitHeight? +templateCar.MaxUnitLength /1000: null,
          width: templateCar?.MaxUnitWidth? +templateCar.MaxUnitWidth /1000: null,
          height: templateCar?.MaxUnitHeight? +templateCar.MaxUnitHeight /1000: null
        },
      stateNumber: templateCar.RegNumber,
      typeOfCar: JSON.parse(templateCar.VehicleInfo).VehicleType? JSON.parse(templateCar.VehicleInfo).VehicleType: null,
      typeOfLoad: JSON.parse(templateCar.VehicleInfo).LoadType? JSON.parse(templateCar.VehicleInfo).LoadType: null,
      weightCapability: templateCar?.MaxMass? +templateCar.MaxMass /1000: null, 
      workingTime: {
          startWorkingTime:  moment(JSON.parse(templateCar?.Timeline)?.Name.substring(
            JSON.parse(templateCar?.Timeline)?.Name.lastIndexOf("с") + 1, 
            JSON.parse(templateCar?.Timeline)?.Name.lastIndexOf("д")
          ), 'HH:mm A'),
          endWorkingTime:  moment(JSON.parse(templateCar.Timeline)?.Name.substring(
            JSON.parse(templateCar?.Timeline)?.Name.lastIndexOf("д") + 2, 
            JSON.parse(templateCar?.Timeline)?.Name.length
          ), 'HH:mm A'),
        },
      yearOfIssue: JSON.parse(templateCar?.VehicleInfo)?.Year? JSON.parse(templateCar?.VehicleInfo)?.Year: null,
      profile: templateCar.ID,
     })
    }
    if(values?.profile){
      let templateProfile =  carsList.filter((car) => (car.ID == values?.profile))[0];
      form.setFieldsValue({
        parameters: {
          length: templateProfile?.MaxUnitHeight? +templateProfile.MaxUnitLength /1000: null,
          width: templateProfile?.MaxUnitWidth? +templateProfile.MaxUnitWidth /1000: null,
          height: templateProfile?.MaxUnitHeight? +templateProfile.MaxUnitHeight /1000: null
        },
        maxVolume: templateProfile?.MaxVolume? +templateProfile.MaxVolume: null,
        weightCapability: templateProfile?.MaxMass? +templateProfile.MaxMass /1000: null
      })
    }
  }
  function onFinish (values) {
    let vehicle = {
          "vehicle[Vehicle][ForMarket]": values.forMarket, 
          "vehicle[Vehicle][Model]": values.model,
          "vehicle[Vehicle][RegNumber]": values.stateNumber,
          "vehicle[Vehicle][DriverID]": values.driver,
          "vehicle[Vehicle][VehicleCode]": null,
          "vehicle[Vehicle][Name]": null,
          "vehicle[Vehicle][Priority]": null,
          "vehicle[Vehicle][UseMode]": null,
          "vehicle[Vehicle][RouteColor]": null,
          "vehicle[Vehicle][TakeOnlyOrdersInZones]": null,
          "vehicle[Info][Year]": values.yearOfIssue,
          "vehicle[Info][VIN]": values.vinNumber,
          "vehicle[Info][RegCertNum]": values.certificateNumber,
          "vehicle[Info][RegCertDate]": values.certificateIssueDate._d.getFullYear() +
          '-' + values.certificateIssueDate._d.getMonth() + '-' + values.certificateIssueDate._d.getDate(),
          "vehicle[Info][VehicleType]": values.typeOfCar,
          "vehicle[Info][LoadType]": values.typeOfLoad,
          "vehicle[Info][IsTemplate]": values.templateName ? 1 : 0,
          "vehicle[Info][TemplateName]": values.templateName ? values.templateName: null,
          "vehicle[VehicleProfile][MaxMass]": +values.weightCapability,
          "vehicle[VehicleProfile][MaxVolume]": +values.maxVolume,
          "vehicle[VehicleProfile][MaxUnitLength]": +values.parameters.length,
          "vehicle[VehicleProfile][MaxUnitWidth]": +values.parameters.width,
          "vehicle[VehicleProfile][Name]": `${ +values.weightCapability / 1000}т ${+values.maxVolume} м3  ${+values.parameters.length}х${+values.parameters.width}x${+values.parameters.height}`,
          "vehicle[VehicleProfile][MaxUnitHeight]": +values.parameters.height,
          "vehicle[VehicleTimeline][MinStartTime]": moment(values.workingTime.startWorkingTime._d).hours() + ':' + moment(values.workingTime.startWorkingTime._d).minutes(),
          "vehicle[VehicleTimeline][MaxEndTime]": moment(values.workingTime.endWorkingTime._d).hours() + ':' + moment(values.workingTime.endWorkingTime._d).minutes(),
          "vehicle[VehicleTimeline][Name]": `с ${ moment(values.workingTime.startWorkingTime._d).hours() + ':' + moment(values.workingTime.startWorkingTime._d).minutes()} до ${moment(values.workingTime.endWorkingTime._d).hours() + ':' + moment(values.workingTime.endWorkingTime._d).minutes()}`,
          "vehicle[StartDepot][Name]": values.garageAddress.value,
          "vehicle[StartDepot][Latitude]": values.garageAddress.data.geo_lat,
          "vehicle[StartDepot][Longitude]": values.garageAddress.data.geo_lon,
          "vehicle[StartDepot][DepotTypeID]": null,
          "vehicle[StartDepot][DepotCode]": null,
          "vehicle[ZoneVehicle][Zone]": workingZones,
          "vehicle[VehicleTariff][Name]": values.tariff,
          "vehicle[VehicleTracker][IMEI]": null,
          "vehicle[VehicleRestriction][Restriction]": null,
        }
        dispatch(createVehicleActions({vehicle, AuthToken}));
  }
  useEffect(() => {
    dispatch(getRatesActions({AuthToken}));
    dispatch(getVehiclesActions({ AuthToken }));
    dispatch(getZonesActions({AuthToken}));
  }, []);
  return (
    <div className="d-flex flex-fill flex-column justify-content-start align-content-start my-garage-add-form-wrapper">
         {visibilityButtonClose ? <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      > <ElloTypographyTitle level={5}>
      Автомобиль 
    </ElloTypographyTitle>
     <div onClick={() => dispatch(addVehicleModalActions(false))}>
          <ReactSVG
            style={{ width: '50px' }}
            className="svg-container"
            src={'/assets/icons/close.svg'}
          />
        </div>
        
      </div>:null} 
      <ElloForm form={form} onFinish={onFinish} onValuesChange={(arg1, arg2) => {
        changeValues(arg1, arg2)
      }}>
        {error ? <ElloAlert message={error} type="error" /> : null}
        <br />
        <Row1 carsList={carsList}/>
        <Row2 />
        <Row3 />
        <Row4/>
        <Row5 />
        <Row7  ratesList={ratesList} />
        <Row8 zonesList={zonesList} setWorkingZones={setWorkingZones} driversList={driversList}/>
        <Row6 />
      </ElloForm>
    </div>
  );
}

export default AddFormCars;
