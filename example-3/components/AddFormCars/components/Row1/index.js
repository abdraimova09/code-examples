import React from 'react';

import {
  ElloSelect,
  ElloSelectOption,
  ElloSpace,
  ElloCol,
  ElloRadio,
  ElloRadioGroup,
  ElloFormItem,
  ElloTooltip,
} from '@components';
import { VISIBILITY_CARS } from '../../../../utils/constants';

function Row1({ carsList }) {
  let templates = carsList.filter(
    (car) => car.VehicleInfo && JSON.parse(car.VehicleInfo).IsTemplate == '1'
  );
  let profiles = [];
  carsList.forEach((item) => {
    if (
      item.MaxMass != null &&
      item.MaxUnitHeight != null &&
      item.MaxUnitLength &&
      item.MaxUnitWidth &&
      item.MaxVolume != null
    ) {
      profiles.push({
        ID: item.ID,
        Name: `${item.MaxMass / 1000}т ${item.MaxVolume}м3 ${
          item.MaxUnitLength / 1000
        }x${item.MaxUnitWidth / 1000}x${item.MaxUnitHeight / 1000}`,
      });
    }
  });
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
        <ElloCol className="my-garage-add-form-column-2">
          <ElloSpace>
            <ElloFormItem name="template" noStyle>
              <ElloSelect style={{ width: 140 }} placeholder="Выберите шаблон">
                {templates.map((item) => (
                  <ElloSelectOption key={item.ID} value={item.ID}>
                    {JSON.parse(item.VehicleInfo).TemplateName}
                  </ElloSelectOption>
                ))}
              </ElloSelect>
            </ElloFormItem>
          </ElloSpace>
        </ElloCol>
        <ElloCol className="my-garage-add-form-column-3" />
      </div>
      <div className="d-flex">
        <ElloFormItem name="profile" noStyle>
          <ElloSelect style={{ width: 180 }} placeholder="Выберите профиль">
            {profiles.map((item) => (
              <ElloSelectOption key={item.ID} value={item.ID}>
                {item.Name}
              </ElloSelectOption>
            ))}
          </ElloSelect>
        </ElloFormItem>
      </div>
    </>
  );
}

export default Row1;
