/* eslint-disable */
import React from 'react';
import { useMap } from 'react-leaflet';

import { borderPointsToPolygon } from '../../../../utils/transformers';

import './styles.less';

function MapZoom({ currentZone }) {
  const map = useMap();
  
  React.useEffect(() => {
    if (currentZone?.borderPoints) {
      map.fitBounds(borderPointsToPolygon(currentZone.borderPoints));
    }
  }, [currentZone?.id]);
  
  return <></>;
}

export default MapZoom;
