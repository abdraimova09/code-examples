import React from 'react';
import { ReactSVG } from 'react-svg';

import {
  ElloFormItem,
  ElloSelect,
  ElloRow,
  ElloCol,
  ElloSelectOption,
  ElloTooltip,
} from '@components';

import { DRIVERS_CATEGORY, DRIVER_APPOINTED } from '../../utils/constants';

import './styles.less';
import { ElloButton, ElloDivider } from '../../../../common/components';

const FilterFormDrivers = ({
  setCategoryOfDriver,
  setAppointedDriver,
  appointedDriver,
  categoryOfDriver,
  handleResetFilter,
}) => {
  return (
    <ElloRow
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ElloCol span={11}>
        <ElloFormItem
          style={{ marginRight: '15px' }}
          label="Открытые категории"
          className="form-item-column"
        >
          <ElloSelect
            placeholder="Показывать все"
            value={categoryOfDriver}
            mode="multiple"
            onChange={(e) => setCategoryOfDriver(e)}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <ElloDivider style={{ margin: '4px 0' }} />
                <div className="d-flex justify-content-center align-items-center">
                  <ElloButton
                    type="default"
                    shape="round"
                    size="large"
                    onClick={() => setCategoryOfDriver([])}
                  >
                    Очистить
                  </ElloButton>
                </div>
              </div>
            )}
          >
            {DRIVERS_CATEGORY.map((item) => (
              <ElloSelectOption key={item.id} value={item.label}>
                {item.label}
              </ElloSelectOption>
            ))}
          </ElloSelect>
        </ElloFormItem>
      </ElloCol>
      <ElloCol span={10}>
        <ElloFormItem
          label="Назначен на авто"
          className="form-item-column"
          style={{ marginRight: '15px' }}
        >
          <ElloSelect
            value={appointedDriver}
            onChange={(e) => setAppointedDriver(e)}
          >
            {DRIVER_APPOINTED.map((item) => (
              <ElloSelectOption key={item.id} value={item.label}>
                {item.label}
              </ElloSelectOption>
            ))}
          </ElloSelect>
        </ElloFormItem>
      </ElloCol>
      <ElloCol span={3}>
        <ElloTooltip title="Сброс фильтра">
          <ReactSVG
            onClick={() => handleResetFilter()}
            className="reset-filter-fields"
            src={'/assets/icons/resetFilter.svg'}
          />
        </ElloTooltip>
      </ElloCol>
    </ElloRow>
  );
};

export default FilterFormDrivers;
