import React, { useCallback } from 'react';

import { ElloEditItemIcon, ElloDeleteItemIcon, ElloPopup } from '@components';

import './styles.less';

function Item({
  name,
  id,
  costCargo,
  costTime,
  costDistance,
  onDelete,
  onUpdate,
}) {
  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id]);
  const handleUpdate = useCallback(() => {
    onUpdate(id);
  }, [id]);
  const [visibilityDeletePopup, setVisibilityDeletePopup] =
    React.useState(false);

  return (
    <div className="my-garage-rate-item-wrapper list-item-wrapper driver-card">
      <ElloPopup
        action={handleDelete}
        visibility={visibilityDeletePopup}
        setVisibility={setVisibilityDeletePopup}
        title={'Удалить тариф ?'}
      />
      <div className="list-item-title">{name}</div>
      <div className="list-item-prop">
        <div className="list-item-prop-text">Стоимость 1 км пути, руб.:</div>
        <div className="my-garage-driver-card-item">{costDistance}</div>
      </div>
      <div className="list-item-prop">
        <div className="list-item-prop-text">Стоимость 1 часа, руб.:</div>
        <div className="my-garage-driver-card-item">{costTime}</div>
      </div>
      <div className="list-item-prop">
        <div className="list-item-prop-text">
          Стоимость погрузки/разгрузки, руб.:
        </div>
        <div className="my-garage-driver-card-item">{costCargo}</div>
      </div>
      <div className="list-item-toolbar">
        <ElloDeleteItemIcon onClick={() => setVisibilityDeletePopup(true)} />
        <ElloEditItemIcon onClick={handleUpdate} />
      </div>
    </div>
  );
}

export default Item;
