const parseZonesFromAPI = (rawItems) => {
  return rawItems.map((item) => ({
    id: item.ID,
    borderPoints: item.BorderPoints,
    name: item.Name,
    zoneCode: item.ZoneCode,
  }));
};

const parseRatesFromAPI = (rawItems) => {
  return rawItems.map((item) => {
    const calcValues = item.RoutePriceFormula?.split('+').map(
      (i) => +i.split('*')[1]
    ) ?? [0, 0, 0];

    return {
      id: item.ID,
      name: item.Name,
      costCargo: calcValues[0],
      costTime: calcValues[2],
      costDistance: calcValues[1],
    };
  });
};

const borderPointsToPolygon = (borderPoints = []) => {
  let result = [];

  borderPoints.forEach((borderPoint) => {
    result.push([borderPoint[1], borderPoint[0]]);
  });

  return result;
};

export { parseZonesFromAPI, parseRatesFromAPI, borderPointsToPolygon };
