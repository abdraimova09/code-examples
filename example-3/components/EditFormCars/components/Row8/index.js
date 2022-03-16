import React from 'react';
import {
  ElloRow,
  ElloFormItem,
  ElloSelectOption,
  ElloSelect,
  ElloCol,
  ElloInput,
} from '@components';

const Row8 = ({ driversList }) => {
  return (
    <ElloRow>
      <ElloCol className="my-garage-add-form-column-1">
        <ElloFormItem
          label={
            <>
              IMEI трекера{' '}
              <a
                href="https://www.youtube.com/watch?v=GbvQABLcWas"
                target="_blank"
                rel="noreferrer"
                className="ml-1"
                style={{ color: 'blue' }}
              >
                (Инструкция)
              </a>
            </>
          }
          className="form-item-column"
          name="IMEI"
        >
          <ElloInput placeholder="Введите номер" />
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
