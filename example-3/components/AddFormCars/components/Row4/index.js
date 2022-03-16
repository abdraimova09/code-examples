import React from 'react';

import {
  ElloCol,
  ElloRow,
  ElloFormItem,
  ElloInputStateNumber,
} from '@components';
import ParametersInput from '../ParametersInput';

function Row4() {
  return (
    <ElloRow>
      <ElloCol className="d-flex flex-row my-garage-add-form-column-1">
        <ElloFormItem
          label="VIN номер"
          className="form-item-column full-width"
          name="vinNumber"
          rules={[
            {
              required: true,
              message: 'Пожалуйста укажите VIN номер',
            },
          ]}
        >
          <ElloInputStateNumber
            className="full-width"
            maxLength={17}
            placeholder="Введите номер"
          />
        </ElloFormItem>
      </ElloCol>

      <ElloRow className="d-flex flex-row my-garage-add-form-parameters my-garage-add-form-column-2">
        <ElloFormItem
          label="Параметры, м"
          className="form-item-column"
          name="parameters"
          rules={[
            {
              required: true,
              message: 'Пожалуйста укажите параметры',
              validator: (_, value) => {
                if (!!value?.length && !!value?.width && !!value?.height) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('Пожалуйста укажите все параметры')
                );
              },
            },
          ]}
        >
          <ParametersInput />
        </ElloFormItem>
      </ElloRow>
    </ElloRow>
  );
}

export default Row4;
