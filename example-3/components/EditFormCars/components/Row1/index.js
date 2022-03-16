import React from 'react';

import {
  ElloCol,
  ElloRadio,
  ElloRadioGroup,
  ElloFormItem,
  ElloTooltip,
} from '@components';
import { VISIBILITY_CARS } from '../../../../utils/constants';

function Row1() {
  return (
    <>
      <div className="mb-1">Видимость</div>
      <div className="d-flex">
        <ElloFormItem name="forMarket" noStyle>
          <ElloRadioGroup defaultValue={1}>
            {VISIBILITY_CARS.map((item) => (
              <ElloTooltip key={item.id} title={item.tooltip}>
                <ElloRadio size="large" key={item.id} value={item.id}>
                  {item.label}
                </ElloRadio>
              </ElloTooltip>
            ))}
          </ElloRadioGroup>
        </ElloFormItem>
        <ElloCol className="my-garage-add-form-column-3" />
      </div>
    </>
  );
}

export default Row1;
