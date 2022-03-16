import React from 'react';
import {
  ElloRow,
  ElloFormItem,
  ElloSelectOption,
  ElloSelect,
  ElloCol,
} from '@components';

const Row8 = ({ zonesList, setWorkingZones, driversList }) => {
  return (
    <ElloRow>
      <ElloCol className="my-garage-add-form-column-1">
        <ElloFormItem
          label="Зоны работы"
          className="form-item-column"
          name="workingZones"
        >
          {' '}
          <ElloSelect
            placeholder="Выберите зоны работы"
            mode="multiple"
            onChange={(e) => setWorkingZones(e)}
          >
            {zonesList ? (
              <>
                {zonesList.map((zone) => (
                  <ElloSelectOption key={zone.id} value={zone.zoneCode}>
                    {zone.name}
                  </ElloSelectOption>
                ))}
              </>
            ) : null}
          </ElloSelect>
        </ElloFormItem>
      </ElloCol>
      <ElloCol className="d-flex flex-column my-garage-add-form-column-2">
        <div className="flex-half" />
        <ElloFormItem
          label="Водитель"
          className="form-item-column"
          name="driver"
        >
          <ElloSelect placeholder="Выберите водителя">
            {driversList ? (
              <>
                {driversList.map((driver) => (
                  <ElloSelectOption key={driver.ID} value={driver.ID}>
                    {driver.Name}
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

export default Row8;
