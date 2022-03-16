import React from 'react';

import { ElloResizableVertical } from '@components';
import FormContent from './components/FormContent';
import MapContent from './components/MapContent';

import './styles.less';

function ZonesContent() {
  return (
    <ElloResizableVertical TopChild={MapContent} BottomChild={FormContent} />
  );
}

export default ZonesContent;
