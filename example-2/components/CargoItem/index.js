import React from 'react';

import './styles.less';

function CargoItem({
  title,
  source,
  destination,
  category,
  weight,
  parameters,
  price,
}) {
  return (
    <div className="best-deals-cargo-item-wrapper">
      <div className="d-flex justify-content-between">
        <div className="text-size14 ello-color-darkblue best-deals-cargo-item-title">
          {title}
        </div>
        <div>{category}</div>
      </div>
      <div className="d-flex justify-content-between mt-1">
        <div className="text-size12 best-deals-cargo-item-other">
          Забрать: {source.substr(0, 10)}
        </div>
        <div className="text-size12 best-deals-cargo-item-other">
          Параметры (ДхШхВ), м3: {parameters}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="text-size12 best-deals-cargo-item-other">
          Доставить: {destination.substr(0, 8)}
        </div>
        <div className="text-size12 best-deals-cargo-item-other d-flex justify-content-between">
          <div>Вес, т:{weight}</div>
          <div className="text-size14 best-deals-requests-price pl-1">
            Стоимость: {price}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CargoItem;
