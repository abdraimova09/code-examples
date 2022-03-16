import React from 'react';

import './styles.less';
import ZoneItem from '../ZoneItem';

function ZoneItems({ items, onDelete, onClick, searchValue }) {
  return (
    <div className="my-garage-zones-list d-flex flex-column justify-content-start align-items-start">
      {items
        ? items.map((item) => (
            <ZoneItem
              key={item.id}
              id={item.id}
              name={item.name}
              onClick={onClick}
              onDelete={onDelete}
            />
          ))
        : null}
      {searchValue != '' && items.length < 1 ? (
        <span className="mt-4 pl-3">
          Нет зон доставки по запросу &quot;{searchValue}&quot;
        </span>
      ) : null}
    </div>
  );
}

export default ZoneItems;
