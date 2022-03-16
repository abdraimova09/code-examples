import React from 'react';

import {
  // ElloInputTaggable,
  ElloInputNumber,
  ElloCol,
  ElloFormItem,
  ElloInput,
  ElloInputStateNumber,
  // ElloTooltip,
} from '@components';

function Row3() {
  return (
    <div className="d-flex">
      <ElloCol className="d-flex flex-row my-garage-add-form-column-1">
        <ElloFormItem
          label="Гос. номер"
          className="form-item-column full-width"
          name="stateNumber"
          rules={[
            {
              required: true,
              message: 'Пожалуйста укажите гос. номера автомобиля',
            },
          ]}
        >
          <ElloInputStateNumber
            className="full-width"
            maxLength={8}
            placeholder="Введите гос номер"
            name="stateNumber"
          />
        </ElloFormItem>
      </ElloCol>

      <ElloCol className="d-flex flex-row my-garage-add-form-column-2">
        <ElloFormItem
          label="Г/п, т"
          className="form-item-column my-garage-add-form-input"
          name="weightCapability"
          rules={[
            {
              required: true,
              message: 'Пожалуйста укажите грузоподъемность',
            },
          ]}
        >
          <ElloInputNumber
            style={{ width: '100%' }}
            placeholder="Введите грузоподъемность"
            step={0.01}
          />
        </ElloFormItem>
        <ElloFormItem
          label="Объем, м3"
          className="form-item-column my-garage-add-form-input"
          name="maxVolume"
        >
          {/* <ElloTooltip title="Введите параметры ДхШхВ, объем рассчитается автоматически"> */}
          <ElloInput name="maxVolume" placeholder="Введите объем" />
          {/* </ElloTooltip> */}
        </ElloFormItem>
      </ElloCol>
    </div>
  );
}

export default Row3;
