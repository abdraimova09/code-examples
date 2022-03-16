import React from 'react';

import {
  ElloSelect,
  ElloSelectOption,
  ElloCol,
  ElloInput,
  ElloFormItem,
  ElloInputNumber,
} from '@components';
import { CAR_TYPE_LOAD, TYPE_CARS_ADD_FORM } from '../../../../utils/constants';

function Row2() {
  return (
    <div className="d-flex">
      <ElloCol className="d-flex flex-row my-garage-add-form-column-1">
        <ElloFormItem
          label="Марка"
          className="form-item-column my-garage-add-form-input"
          name="model"
          rules={[
            {
              required: true,
              message: 'Пожалуйста укажите марку автомобиля',
            },
          ]}
        >
          <ElloInput placeholder="Введите марку" />
        </ElloFormItem>
        <ElloFormItem
          label="Год выпуска"
          name="yearOfIssue"
          className="form-item-column my-garage-add-form-input"
        >
          <ElloInputNumber
            className="full-width"
            maxLength={4}
            placeholder="Введите год"
          />
        </ElloFormItem>
      </ElloCol>

      <ElloCol className="d-flex flex-row my-garage-add-form-column-2">
        <ElloFormItem
          label="Тип автомобиля"
          className="form-item-column my-garage-add-form-input"
          name="typeOfCar"
          rules={[
            {
              required: true,
              message: 'Пожалуйста выберите тип автомобиля',
            },
          ]}
        >
          <ElloSelect placeholder="Выберите тип автомобиля">
            {TYPE_CARS_ADD_FORM.map((item) => (
              <ElloSelectOption key={item.id} value={item.label}>
                {item.label}
              </ElloSelectOption>
            ))}
          </ElloSelect>
        </ElloFormItem>
        <ElloFormItem
          label="Тип загрузки"
          className="form-item-column my-garage-add-form-input"
          name="typeOfLoad"
        >
          <ElloSelect placeholder="Выберите тип загрузки">
            {CAR_TYPE_LOAD.map((item) => (
              <ElloSelectOption key={item.id} value={item.label}>
                {item.label}
              </ElloSelectOption>
            ))}
          </ElloSelect>
        </ElloFormItem>
      </ElloCol>
    </div>
  );
}

export default Row2;
