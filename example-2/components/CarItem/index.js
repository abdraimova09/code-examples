import React from 'react';

import './styles.less';

function CarItem({ price, city, carryingCapacity, parameters }) {
  let editedParams = parameters.split('x');
  return (
    <div className="best-deals-car-item-wrapper">
      <div className="d-flex align-items-center justify-content-between">
        <div className="best-deals-car-item-title text-size14 ello-color-darkblue best-deal-car-item-title">
          ()
        </div>
        <div className="best-deals-car-item-price text-size12 ello-color">
          Стоимость: {price ? price : 'не указано'}
        </div>
      </div>
      <div className="best-deals-car-item-other text-size12">
        Город: {city ? city : 'не указано'}
      </div>
      <div className="best-deals-car-item-other text-size12">
        Грузоподъемность, т:{' '}
        {carryingCapacity ? carryingCapacity : 'не указано'}
      </div>
      <div className="best-deals-car-item-other text-size12">
        Параметры (ДхШхВ), м:{' '}
        {parameters && editedParams
          ? editedParams.map((item, index) => (
              <>
                {Math.ceil(item)}
                {index < editedParams.length - 1 ? 'x' : null}
              </>
            ))
          : 'не указано'}
      </div>
    </div>
  );
}

export default CarItem;
