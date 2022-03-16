import React from 'react';
import { ReactSVG } from 'react-svg';

import { ElloSpace, ElloTooltip, ElloPopup } from '@components';

import './styles.less';

function ZoneItem({ name, id, onUpdate, onDelete, onClick }) {
  const handleUpdate = React.useCallback(
    (e) => {
      e.stopPropagation();
      onUpdate(id);
    },
    [onUpdate, id]
  );

  const handleDelete = React.useCallback(() => {
    onDelete(id);
  }, [onDelete, id]);

  const handleClick = React.useCallback(() => {
    onClick(id);
  }, [onClick, id]);
  const [visibilityDeletePopup, setVisibilityDeletePopup] =
    React.useState(false);

  return (
    <div className="my-garage-zone-item-wrapper" onClick={handleClick}>
      <ElloPopup
        action={handleDelete}
        visibility={visibilityDeletePopup}
        setVisibility={setVisibilityDeletePopup}
        title={'Удалить зону ?'}
      />
      <div className="my-garage-zone-item-name">{name}</div>
      <div className="my-garage-zone-item-toolbar">
        <ElloSpace>
          {onUpdate && (
            <ElloTooltip title="Редактировать">
              <div onClick={handleUpdate}>
                <ReactSVG
                  className="svg-container"
                  src={'/assets/icons/data/edit.svg'}
                />
              </div>
            </ElloTooltip>
          )}
          <ElloTooltip title="Удалить">
            <div
              onClick={(e) => {
                e.stopPropagation(), setVisibilityDeletePopup(true);
              }}
            >
              <ReactSVG
                className="svg-container"
                src={'/assets/icons/data/delete.svg'}
              />
            </div>
          </ElloTooltip>
        </ElloSpace>
      </div>
    </div>
  );
}

export default ZoneItem;
