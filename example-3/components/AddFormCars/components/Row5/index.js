import React from 'react';
import moment from 'moment';

import {
  ElloCol,
  ElloRow,
  ElloInput,
  ElloDatePicker,
  ElloFormItem,
} from '@components';
import WorkingTimeInput from '../WorkingTimeInput';

function Row5() {
  function disabledDate(current) {
    return (
      current < moment('1950-01-01', 'YYYY-MM-DD') ||
      (current && current > moment().endOf('day'))
    );
  }
  return (
    <>
      Свидетельство о регистрации
      <ElloRow>
        <ElloCol className="d-flex flex-row my-garage-add-form-column-1">
          <div className="d-flex flex-column full-width">
            <div className="d-flex flex-row justify-content-start align-items-start">
              <ElloFormItem
                label="№ свидетельства"
                className="form-item-column my-garage-add-form-input"
                name="certificateNumber"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста укажите № свидетельства',
                  },
                ]}
              >
                <ElloInput placeholder="Введите номер" />
              </ElloFormItem>
              <ElloFormItem
                label="Дата выдачи"
                className="form-item-column my-garage-add-form-input"
                name="certificateIssueDate"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста укажите дату выдачи',
                  },
                ]}
              >
                <ElloDatePicker
                  disabledDate={disabledDate}
                  className="full-width"
                  placeholder="Выберите дату"
                />
              </ElloFormItem>
            </div>
          </div>
        </ElloCol>
        <ElloRow className="d-flex flex-column my-garage-add-form-parameters my-garage-add-form-column-2">
          <ElloFormItem
            label="Время работы"
            className="form-item-column full-width"
            name="workingTime"
          >
            <WorkingTimeInput />
          </ElloFormItem>
        </ElloRow>
      </ElloRow>
    </>
  );
}

export default Row5;
