import React from 'react';

import Item from '../Item';

import './styles.less';

function List({ items, onDelete, onUpdate }) {
  return (
    <div className="full-width">
      {items &&
        items.map((i) => (
          <Item
            key={i.id}
            id={i.id}
            name={i.name}
            costCargo={i.costCargo}
            costDistance={i.costDistance}
            costTime={i.costTime}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
    </div>
  );
}

export default List;
