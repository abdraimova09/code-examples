import React from 'react';
import { ReactSVG } from 'react-svg';
import { FaChevronRight } from 'react-icons/fa';

import './styles.less';

function MenuItem({ id, isActive, title, description, icon, onClick }) {
  const handleClick = React.useCallback(() => {
    onClick(id);
  }, [id, onClick]);
  return (
    <div
      className={`d-flex flex-fill flex-row justify-content-between align-items-center border-default my-garage-menu-item-wrapper ${
        isActive ? 'is-active' : ''
      }`}
      onClick={handleClick}
    >
      <div className="d-flex flex-row justify-content-between align-items-center">
        <ReactSVG className="svg-container" src={icon} />
        <div className="d-flex flex-column justify-content-center align-items-start">
          <b>{title}</b>
          <small>{description}</small>
        </div>
      </div>
      <FaChevronRight />
    </div>
  );
}

export default MenuItem;
