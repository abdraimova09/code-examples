import React from 'react';
import { renderRoutes } from 'react-router-config';

import { ElloCol } from '@components';

import MenuItem from '../MenuItem';

import './styles.less';

function MenuItems({ items, history }) {
  let menuItems = [
    {
      icon: '/assets/icons/drivers.svg',
      description: 'Внесите данные о водителях',
    },
    {
      icon: '/assets/icons/cars.svg',
      description: 'Внесите информацию о вашем автопарке',
    },
    {
      icon: '/assets/icons/rates.svg',
      description:
        'Внесите ваши тарифы для первичной оценки стоимости доставки',
    },
    {
      icon: '/assets/icons/zones.svg',
      description: 'Укажите зоны, в рамках которых может работать ваш автопарк',
    },
  ];
  return (
    <div className="d-flex flex-fill menu-items-wrapper">
      <ElloCol span={8} className="border-right-default">
        {items.map((i, index) => (
          <MenuItem
            key={index}
            id={index}
            isActive={window.location.pathname === i.path}
            title={i.title}
            description={menuItems[index].description}
            icon={menuItems[index].icon}
            onClick={() => history.push(i.path)}
          />
        ))}
      </ElloCol>
      <ElloCol
        style={{ backgroundColor: 'white' }}
        span={16}
        className="position-relative"
      >
        {renderRoutes(items)}
      </ElloCol>
    </div>
  );
}

export default MenuItems;
