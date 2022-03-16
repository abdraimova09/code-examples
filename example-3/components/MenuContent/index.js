import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import DefaultContent from '../DefaultContent';

import './styles.less';

function MenuContent({ menuId, menuItems }) {
  const MenuComponent = React.useMemo(() => {
    const menu = menuItems.find((i) => i.id === menuId);

    return menu ? menu.content : DefaultContent;
  }, [menuItems, menuId]);

  return (
    <TransitionGroup>
      <CSSTransition
        key={menuId}
        timeout={1000}
        classNames="page-slider"
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <MenuComponent />
      </CSSTransition>
    </TransitionGroup>
  );
}

export default MenuContent;
