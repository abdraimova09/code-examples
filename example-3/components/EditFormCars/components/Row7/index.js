import React from 'react';

import {
  ElloCol,
  ElloRow,
  ElloFormItem,
  ElloSelect,
  ElloSelectOption,
} from '@components';

import { AddressSuggestions } from 'react-dadata';

const Row7 = ({ ratesList, vehicleForEdit }) => {
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
            onChange={(e) => console.log(e)}
            token={process.env.REACT_APP_API_KEY}
            suggestionClassName="dadata-suggest"
            defaultQuery={vehicleForEdit.StartDepotName}
            inputProps={{
              className: 'ant-input',
              placeholder: 'Введите адрес гаража',
              name: 'garageAddress',
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
