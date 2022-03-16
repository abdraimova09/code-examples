import React from 'react';
import { useSelector } from 'react-redux';

import { ElloMap } from '@components';
import AddZonePopup from '../../../AddZonePopup';
import {
  borderPointsSelector,
  currentZoneSelector,
  loadingSelector,
} from '../../../../selectors/myGarage';
import { ElloLoader } from '../../../../../../common/components';
import MapZoom from '../MapZoom';

import './styles.less';

function MapContent() {
  const isLoading = useSelector(loadingSelector);
  const borderPoints = useSelector(borderPointsSelector);
  const currentZone = useSelector(currentZoneSelector);

  return (
    <div className="my-garage-map-wrapper">
      <ElloMap
        polygons={borderPoints}
        currentZone={currentZone}
        popupElement={AddZonePopup}
      >
        <MapZoom currentZone={currentZone} />
      </ElloMap>
      {isLoading && <ElloLoader />}
    </div>
  );
}

export default MapContent;
