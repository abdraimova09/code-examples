import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';

import { ElloForm, ElloRow, ElloAlert } from '@components';

import Col1 from './components/Col1';
import Col3 from './components/Col3';

import { createDriverActions } from '../../actions/myGarage';
import { DRIVERS_CATEGORY } from '../../utils/constants';
import {
  addDriverModalSelector,
  errorSelector,
} from '../../selectors/myGarage';
import { currentUserSelector } from '../../../current-user/selectors/auth';

const AddFormDrivers = ({ handleCloseAddForm }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [driverImg, setDriverImg] = useState(null);
  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const error = useSelector(errorSelector);
  const { AuthToken } = useSelector(currentUserSelector);
  async function onFinish(values) {
    let driver = {
      'driver[Driver][Name]': values.DriverName,
      'driver[Driver][Phone]': values.DriverPhone,
      'driver[Driver][PassportNumber]': values.PassportNumber,
      'driver[Driver][PassportDate]':
        values.PassportDate._d.getFullYear() +
        '-' +
        values.PassportDate._d.getMonth() +
        '-' +
        values.PassportDate._d.getDate(),
      'driver[Driver][PassportIssuedBy]': values.PassportIssued,
      'driver[Driver][LicenseNumber]': values.VUnumber,
      'driver[Driver][TimeZone]': timeZone,
      'driver[Driver][DriverCode]': null,
      'driver[Driver][Avatar][driver][name]':
        driverImg && driverImg.fileName ? driverImg.fileName : null,
      'driver[Driver][Avatar][driver][value]':
        driverImg && driverImg.base64 ? driverImg.base64 : null,
      'driver[Info][Birthday]':
        values.DriverBirthday._d.getFullYear() +
        '-' +
        values.DriverBirthday._d.getMonth() +
        '-' +
        values.DriverBirthday._d.getDate(),
      'driver[Info][Email]': values.DriverEmail,
      'driver[Info][RegAddress]': values.AddressReg,
      'driver[Info][LicenseDate]':
        values.VUdate._d.getFullYear() +
        '-' +
        values.VUdate._d.getMonth() +
        '-' +
        values.VUdate._d.getDate(),
      'driver[Info][LicenseCategory]': values.Category,
    };
    await dispatch(createDriverActions({ AuthToken, driver }));
    // dispatch(getDriversActions());
    // handleCloseAddForm();
    // form.resetFields();
    // setDriverImg(null);
    // setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }
  const addDriverModal = useSelector(addDriverModalSelector);
  React.useEffect(() => {
    form.resetFields();
  }, [addDriverModal]);
  return (
    <div className="d-flex flex-fill flex-column justify-content-start align-content-start my-garage-add-form-wrapper">
      <ElloForm form={form} onFinish={onFinish}>
        {error ? <ElloAlert message={error} type="error" /> : null}
        <br />
        <ElloRow>
          <Col1 />
          <Col3
            options={DRIVERS_CATEGORY}
            driverImg={driverImg}
            setDriverImg={setDriverImg}
            timeZone={timeZone}
            setTimeZone={setTimeZone}
            handleCloseAddForm={handleCloseAddForm}
          />
        </ElloRow>
      </ElloForm>
    </div>
  );
};

export default AddFormDrivers;
