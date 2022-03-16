import React from 'react';

import { ElloInputGroup, ElloInput } from '@components';
import { cleanUpObject } from '@common/utils/services';

import './styles.less';

function ParametersInput({ value, onChange }) {
  const triggerChange = (changedData) => {
    const parsedData = cleanUpObject(changedData);
    if (parsedData) {
      onChange(Object.assign({}, value, parsedData));
    } else {
      onChange();
    }
  };

  return (
    <ElloInputGroup compact>
      <ElloInput
        placeholder="Длина"
        onChange={(e) => triggerChange({ ...value, length: e.target.value })}
        value={value?.length}
      />
      <ElloInput
        placeholder="Ширина"
        onChange={(e) => triggerChange({ ...value, width: e.target.value })}
        value={value?.width}
      />
      <ElloInput
        placeholder="Высота"
        onChange={(e) => triggerChange({ ...value, height: e.target.value })}
        value={value?.height}
      />
    </ElloInputGroup>
  );
}

export default ParametersInput;
