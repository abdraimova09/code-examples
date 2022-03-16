import React, { useCallback, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import {
  ElloInput,
  ElloButton,
  ElloCollapse,
  ElloCollapsePanel,
} from '@components';

import AddRateForm from '../AddRateForm';

import './styles.less';

function TopComponent({
  currentItem,
  onSearch,
  searchValue,
  resetCurrentItem,
  onAddRate,
}) {
  const [activeKey, setActiveKey] = useState(0);
  const handleSearch = useCallback((e) => {
    onSearch(e.target.value);
  }, []);
  const handleShowForm = useCallback(() => {
    resetCurrentItem();
    setActiveKey(activeKey === 1 ? 0 : 1);
  }, [activeKey]);

  useEffect(() => {
    if (currentItem?.id) {
      setActiveKey(1);
    }
  }, [currentItem?.id]);

  return (
    <div className="my-garage-top-component d-flex flex-column full-width">
      <div className="d-flex flex-row justify-content-between full-width align-items-center">
        <ElloInput
          placeholder="Поиск по тарифам"
          className="search-input"
          onChange={handleSearch}
          value={searchValue}
          suffix={<SearchOutlined />}
        />
        <ElloButton
          type="primary"
          shape="round"
          className={`my-garage-toggle-button${activeKey ? '-active' : ''}`}
          onClick={handleShowForm}
        >
          Добавить тариф
        </ElloButton>
      </div>
      <ElloCollapse activeKey={activeKey}>
        <ElloCollapsePanel header="" key={1} showArrow={false}>
          <AddRateForm
            currentItem={currentItem}
            onAddRate={onAddRate}
            setActiveKey={setActiveKey}
          />
        </ElloCollapsePanel>
      </ElloCollapse>
      <br />
    </div>
  );
}

export default TopComponent;
