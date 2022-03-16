import React from 'react';
// import moment from 'moment';

import {
  ElloCol,
  ElloFormItem,
  ElloInput,
  ElloTypographyTitle,
  ElloDatePicker,
} from '@components';
import { Input } from 'antd';

const EditCol1 = ({ forEditDriver }) => {
  console.log(forEditDriver);
  return (
    <ElloCol style={{ marginRight: '10px' }} span={12}>
      <ElloTypographyTitle level={5}>Водитель</ElloTypographyTitle>
      <ElloCol>
        <ElloFormItem
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ФИО',
            },
          ]}
          label="Фамилия Имя Отчество"
          name="Name"
          className="form-item-column"
        >
          <Input placeholder="Введите ФИО полностью" />
        </ElloFormItem>
      </ElloCol>
      <ElloFormItem
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите дату рождения',
          },
        ]}
        label="Дата рождения"
        name="Birthday"
        className="form-item-column"
      >
        <ElloDatePicker placeholder="Введите дату рождения" />
      </ElloFormItem>
      <ElloFormItem
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите номер телефона',
          },
        ]}
        label="Телефон"
        name="Phone"
        className="form-item-column"
      >
        <ElloInput placeholder="Введите телефон" />
      </ElloFormItem>
      <ElloFormItem
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите email',
          },
        ]}
        label="Email"
        name="Email"
        className="form-item-column"
      >
        <ElloInput placeholder="Введите email" />
      </ElloFormItem>
      <ElloTypographyTitle level={5}>
        Водительское удостоверение
      </ElloTypographyTitle>
      <ElloCol>
        <ElloFormItem
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите номер водительского удостоверения',
            },
          ]}
          label="Номер водительского удостоверения"
          name="LicenseNumber"
          className="form-item-column"
        >
          <ElloInput placeholder="Введите номер ВУ" />
        </ElloFormItem>
      </ElloCol>
      <ElloFormItem
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите дату выдачи',
          },
        ]}
        label="Дата выдачи"
        name="LicenseDate"
        className="form-item-column"
      >
        <ElloDatePicker placeholder="Введите дату выдачи" />
      </ElloFormItem>
    </ElloCol>
  );
};

export default EditCol1;
