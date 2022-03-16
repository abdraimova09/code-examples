import React from 'react';

import { ElloInputGroup, ElloTimePicker } from '@components';

import './styles.less';

function WorkingTimeInput({ value = {}, onChange }) {
  const triggerChange = (changedData) => {
    onChange(Object.assign({}, value, changedData));
  };

  return (
    <ElloInputGroup compact className="full-width">
      <ElloTimePicker
        onChange={(startWorkingTime) => triggerChange({ startWorkingTime })}
        value={value?.startWorkingTime}
        placeholder="Начало работы"
        showNow={false}
        format="HH:mm"
        className="my-garage-add-form-input"
      />
      <ElloTimePicker
        onChange={(endWorkingTime) => triggerChange({ endWorkingTime })}
        value={value?.endWorkingTime}
        placeholder="Окончание работы"
        showNow={false}
        format="HH:mm"
        className="my-garage-add-form-input"
      />
    </ElloInputGroup>
  );
}

export default WorkingTimeInput;
