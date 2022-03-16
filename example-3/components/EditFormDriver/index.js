import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import moment from 'moment';

import {
  ElloForm,
  ElloRow,
  ElloButton,
  ElloTypographyTitle,
  ElloAlert,
} from '@components';

import EditCol1 from './components/EditCol1/';
import EditCol2 from './components/EditCol2';
import { DRIVERS_CATEGORY } from '../../utils/constants';
import {
  blockDriversActions,
  editDriverActions,
  resetDriverPasswordActions,
  sendToDriverInviteToAppActions,
} from '../../actions/myGarage';

import './styles.less';
import { errorSelector } from '../../selectors/myGarage';
import { currentUserSelector } from '../../../current-user/selectors/auth';

const EditFormDrivers = ({ handleCloseForm2, edit }) => {
  const dispatch = useDispatch();
  // const driverForEdit = useSelector(driverForEditSelector);
  // console.log('driverforedit', driverForEdit);
  const error = useSelector(errorSelector);
  const [timeZone, setTimeZone] = useState(
    edit && edit.TimeZone
      ? edit.TimeZone
      : Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [driverImg, setDriverImg] = useState(null);
  const [form] = Form.useForm();
  console.log('edit', edit, JSON.parse(edit.DriverInfo));
  function buildObjectForForm() {
    form.setFieldsValue({
      Name: edit?.Name,
      Birthday: moment(JSON.parse(edit?.DriverInfo)?.Birthday, 'YYYY-MM-DD'),
      Email: JSON.parse(edit?.DriverInfo)?.Email,
      LicenseDate: moment(
        JSON.parse(edit?.DriverInfo)?.LicenseDate,
        'YYYY-MM-DD'
      ),
      RegAddress: JSON.parse(edit?.DriverInfo)?.RegAddress,
      LicenseCategory: JSON.parse(edit?.DriverInfo)
        ?.LicenseCategory.substr(
          1,
          JSON.parse(edit?.DriverInfo).LicenseCategory.length - 2
        )
        .split(','),
      PassportIssuedBy: edit?.PassportIssuedBy,
      PassportNumber: edit?.PassportNumber,
      LicenseNumber: edit?.LicenseNumber,
      PassportDate: moment(edit?.PassportDate, 'YYYY-MM-DD'),
      Phone: edit?.Phone,
      TimeZone: edit?.TimeZone,
    });
  }
  useEffect(() => {
    buildObjectForForm();
    setTimeZone(edit.TimeZone);
    setDriverImg();
  }, [edit]);
  const { AuthToken } = useSelector(currentUserSelector);
  function onFinish(values) {
    let driver = {
      'driver[Driver][Name]': values?.Name,
      'driver[Driver][Phone]': values?.Phone,
      'driver[Driver][PassportNumber]': values?.PassportNumber,
      'driver[Driver][PassportDate]':
        values?.PassportDate?._d.getFullYear() +
        '-' +
        values?.PassportDate?._d.getMonth() +
        '-' +
        values?.PassportDate?._d.getDate(),
      'driver[Driver][PassportIssuedBy]': values.PassportIssuedBy,
      'driver[Driver][LicenseNumber]': values.LicenseNumber,
      'driver[Driver][TimeZone]': timeZone,
      'driver[Driver][DriverCode]': edit.DriverCode,
      'driver[Driver][Avatar][driver][name]':
        driverImg && driverImg.fileName ? driverImg.fileName : null,
      'driver[Driver][Avatar][driver][value]':
        driverImg && driverImg.base64 ? driverImg.base64 : null,
      'driver[Info][Birthday]':
        values?.Birthday._d.getFullYear() +
        '-' +
        values?.Birthday._d.getMonth() +
        '-' +
        values?.Birthday._d.getDate(),
      'driver[Info][Email]': values?.Email,
      'driver[Info][RegAddress]': values?.RegAddress,
      'driver[Info][LicenseDate]':
        values?.LicenseDate._d.getFullYear() +
        '-' +
        values?.LicenseDate._d.getMonth() +
        '-' +
        values?.LicenseDate._d.getDate(),
      'driver[Info][LicenseCategory]': values?.LicenseCategory,
    };
    dispatch(editDriverActions({ AuthToken, driver }));
  }
  return (
    <div className="d-flex flex-fill flex-column justify-content-start align-content-start my-garage-add-form-wrapper">
      {edit ? (
        <ElloForm form={form} onFinish={onFinish}>
          {error ? <ElloAlert message={error} type="error" /> : null}
          <br />
          <ElloRow>
            <EditCol1 />
            <EditCol2
              handleCloseForm2={handleCloseForm2}
              driverForEdit={edit}
              options={DRIVERS_CATEGORY}
              driverImg={driverImg}
              setDriverImg={setDriverImg}
              timeZone={timeZone}
              setTimeZone={setTimeZone}
            />
          </ElloRow>
          <ElloTypographyTitle level={5}>
            Мобильное приложение
          </ElloTypographyTitle>
          <ElloRow>
            <ElloButton
              onClick={() =>
                dispatch(
                  sendToDriverInviteToAppActions({ id: edit.UserID, AuthToken })
                )
              }
              type="primary"
              className="mr-1"
              shape="round"
            >
              Отправить приглашение водителю
            </ElloButton>
            <ElloButton
              onClick={() =>
                dispatch(
                  resetDriverPasswordActions({ id: edit.UserID, AuthToken })
                )
              }
              className="mr-1 my-garage-add-form-driver-app-btns"
              shape="round"
            >
              Сбросить пароль и выслать новый
            </ElloButton>
            <ElloButton
              className="mr-1 my-garage-add-form-driver-app-btns"
              shape="round"
              onClick={() =>
                dispatch(blockDriversActions({ id: edit.UserID, AuthToken }))
              }
            >
              {edit.Blocked
                ? 'Разблокировать водителя'
                : 'Заблокировать водителя'}
            </ElloButton>
          </ElloRow>
        </ElloForm>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default EditFormDrivers;
