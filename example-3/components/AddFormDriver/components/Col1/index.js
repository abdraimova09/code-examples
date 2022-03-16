import React from 'react';

import {
  ElloCol,
  ElloFormItem,
  ElloInput,
  ElloTypographyTitle,
  ElloDatePicker,
} from '@components';

const Col1 = () => {
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
          name="DriverName"
          className="form-item-column"
        >
          <ElloInput placeholder="Введите ФИО полностью" />
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
        name="DriverBirthday"
        className="form-item-column"
      >
        <ElloDatePicker
          className="full-width"
          placeholder="Введите дату рождения"
        />
      </ElloFormItem>
      <ElloFormItem
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите номер телефона',
          },
        ]}
        label="Телефон"
        name="DriverPhone"
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
        name="DriverEmail"
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
          name="VUnumber"
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
        name="VUdate"
        className="form-item-column"
      >
        <ElloDatePicker
          className="full-width"
          placeholder="Введите дату выдачи"
        />
      </ElloFormItem>
    </ElloCol>
  );
};

export default Col1;
