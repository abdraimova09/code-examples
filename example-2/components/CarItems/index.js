import React from 'react';

import { ElloSpace, ElloTypographyTitle, ElloButton } from '@components';
import CarItem from '../CarItem';

import './styles.less';

function CarItems({ items = [] }) {
  items = items.filter((cargo, index) => index < 4);
  return (
    <div className="best-deals-car-items-wrapper">
      <div className="best-deals-car-items-header">
        <ElloSpace direction="vertical" size={0}>
          <ElloTypographyTitle className="ello-color-darkblue" level={5}>
            Лучшее предложение дня:
          </ElloTypographyTitle>
          <ElloTypographyTitle className="ello-color-green" level={5}>
            Машины в аренду
          </ElloTypographyTitle>
          <ElloButton type="primary" shape="round" size="large">
            Поиск транспорта
          </ElloButton>
        </ElloSpace>
      </div>
      <div className="best-deals-car-items">
        {items.map((item) => (
          <CarItem
            key={item.title + item.id}
            title={item.title}
            city={item.city}
            price={item.price}
            carryingCapacity={item.carryingCapacity}
            parameters={item.parameters}
          />
        ))}
      </div>
    </div>
  );
}

export default CarItems;
