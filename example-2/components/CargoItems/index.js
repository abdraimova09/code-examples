import React from 'react';

import { ElloSpace, ElloTypographyTitle, ElloButton } from '@components';
import CargoItem from '../CargoItem';

import './styles.less';

function CargoItems({ items = [] }) {
  items = items.filter((cargo, index) => index < 4);
  return (
    <div className="best-deals-cargo-items-wrapper">
      <div className="best-deals-cargo-items-header">
        <ElloSpace direction="vertical" size={0}>
          <ElloTypographyTitle className="ello-color-blue" level={5}>
            Лучшее предложение дня:
          </ElloTypographyTitle>
          <ElloTypographyTitle className="ello-color-green" level={5}>
            Новые грузы
          </ElloTypographyTitle>
          <ElloButton type="default" shape="round" size="large">
            Поиск груза
          </ElloButton>
        </ElloSpace>
      </div>
      <div className="best-deals-cargo-items">
        {items.map((item) => (
          <CargoItem
            key={item.title + item.id}
            title={item.title}
            source={item.source}
            destination={item.destination}
            category={item.category}
            weight={item.weight}
            price={item.price}
            parameters={item.parameters}
          />
        ))}
      </div>
    </div>
  );
}

export default CargoItems;
