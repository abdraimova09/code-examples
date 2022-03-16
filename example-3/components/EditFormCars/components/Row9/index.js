import React from 'react';
import {
  ElloRow,
  ElloFormItem,
  ElloSelectOption,
  ElloSelect,
  ElloCol,
} from '@components';

const Row9 = ({ zonesList, setWorkingZones, workingZones }) => {
  console.log(zonesList);
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
            value={workingZones}
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
    </ElloRow>
  );
};

export default Row9;
