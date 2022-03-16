import React from 'react';

import {
  ElloCol,
  ElloRow,
  ElloInput,
  ElloCheckbox,
  ElloFormItem,
} from '@components';
import { ElloButton } from '../../../../../../common/components';

function Row6() {
  const [isVisibleInput, setIsVisibleInput] = React.useState(false);
  const handleChange = React.useCallback(
    (e) => {
      setIsVisibleInput(e.target.checked);
    },
    [setIsVisibleInput]
  );

  return (
    <ElloRow className="d-flex flex-row justify-content-between align-items-center">
      <ElloCol>
        <ElloFormItem label="Сохранить как шаблон" name="isTemplate">
          <ElloCheckbox
            value={isVisibleInput}
            onChange={handleChange}
          ></ElloCheckbox>
        </ElloFormItem>

        {isVisibleInput && (
          <ElloFormItem label="Название шаблона" name="templateName">
            <ElloInput placeholder="Введите название шаблона" />
          </ElloFormItem>
        )}
      </ElloCol>
      <ElloButton type="primary" shape="round" htmlType="submit">
        Сохранить изменения
      </ElloButton>
    </ElloRow>
  );
}

export default Row6;
