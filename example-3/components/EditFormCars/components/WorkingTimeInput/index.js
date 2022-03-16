import React from 'react';

import { ElloInputGroup, ElloTimePicker } from '@components';

function WorkingTimeInput({ value = {}, onChange }) {
  const triggerChange = (changedData) => {
    onChange(Object.assign({}, value, changedData));
  };

  return (
    <ElloInputGroup compact className="full-width">
      <ElloTimePicker
        className="half-width"
        onChange={(startWorkingTime) => triggerChange({ startWorkingTime })}
        value={value?.startWorking}
        placeholder="Начало работы"
        showNow={false}
        format="HH:mm"
      />
      <ElloTimePicker
        className="half-width"
        onChange={(endWorkingTime) => triggerChange({ endWorkingTime })}
        value={value?.endWorking}
        placeholder="Окончание работы"
        showNow={false}
        format="HH:mm"
      />
    </ElloInputGroup>
  );
}

export default WorkingTimeInput;
