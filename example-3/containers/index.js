import React from 'react';

import { ElloRow } from '@components';

import MenuItems from '../components/MenuItems';

import './styles.less';

function MyGarage(props) {
  React.useEffect(() => {
    if (window.location.pathname == '/lk/my-garage') {
      props.history.push('/lk/my-garage/drivers');
    }
  }, []);

  return (
    <ElloRow className="my-garage-wrapper">
      <MenuItems history={props.history} items={props.route.routes} />
    </ElloRow>
  );
}

export default MyGarage;
