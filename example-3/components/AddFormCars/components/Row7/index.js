import React from 'react';

import {
  ElloCol,
  ElloRow,
  ElloFormItem,
  ElloSelect,
  ElloSelectOption,
} from '@components';

import { AddressSuggestions } from 'react-dadata';

const Row7 = ({ ratesList }) => {
  return (
    <ElloRow>
      <ElloCol className="my-garage-add-form-column-1">
        <ElloFormItem
          label="Aдрес гаража"
          className="form-item-column"
          name="garageAddress"
          rules={[
            {
              required: true,
              message: 'Пожалуйста укажите адрес гаража',
            },
          ]}
        >
          <AddressSuggestions
            token={process.env.REACT_APP_API_KEY}
            suggestionClassName="dadata-suggest"
            inputProps={{
              className: 'ant-input',
              placeholder: 'Введите адрес гаража',
              // name: 'orderSourceName',
            }}
          />
        </ElloFormItem>
      </ElloCol>
      <ElloCol className="my-garage-add-form-column-2">
        <ElloFormItem label="Тариф" className="form-item-column" name="tariff">
          <ElloSelect placeholder="Выберите тариф">
            {ratesList ? (
              <>
                {ratesList.map((rate) => (
                  <ElloSelectOption key={rate.id} value={rate.name}>
                    {rate.name}
                  </ElloSelectOption>
                ))}
              </>
            ) : null}
          </ElloSelect>
        </ElloFormItem>
      </ElloCol>
    </ElloRow>
  );
};

export default Row7;
