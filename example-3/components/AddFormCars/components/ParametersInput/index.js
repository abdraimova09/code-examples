import React from 'react';
import { ElloInputGroup, ElloInputNumeric } from '@components';
import { cleanUpObject } from '@common/utils/services';

import './styles.less';

function ParametersInput({ value = {}, onChange }) {
  console.log('value', value);
  const triggerChange = (changedData) => {
    const parsedData = cleanUpObject(changedData);
    console.log('data', changedData);
    if (parsedData) {
      onChange(Object.assign({}, value, parsedData));
    } else {
      onChange();
    }
  };

  return (
    <ElloInputGroup compact>
      <ElloInputNumeric
        placeholder="Длина"
        onChange={(e) => {
          triggerChange({ length: e?.target?.value }), console.log(e);
        }}
        value={value?.length ? value?.length : null}
        max={22}
        min={0}
      />
      <ElloInputNumeric
        placeholder="Ширина"
        onChange={(e) => triggerChange({ width: e?.target?.value })}
        value={value?.width}
        max={3}
        min={0}
      />
      <ElloInputNumeric
        placeholder="Высота"
        onChange={(e) => triggerChange({ height: e?.target?.value })}
        value={value?.height}
        max={5}
        min={0}
      />
    </ElloInputGroup>
  );
}

export default ParametersInput;
