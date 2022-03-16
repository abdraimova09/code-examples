const parseCarsFromAPI = (rawItems) => {
  return rawItems.map((item) => ({
    id: +item.ID,
    title: item.Name,
    price: Math.floor(Math.random() * (60000 - 10000 + 1) + 10000),
    city: item.StartDepotName,
    carryingCapacity: item.MaxMass / 1000,
    parameters: `${item.MaxUnitLength / 1000}x${item.MaxUnitWidth / 1000}x${
      item.MaxUnitHeight / 1000
    }`,
  }));
};

const parseCargosFromAPI = (rawItems) => {
  return rawItems.map((item) => ({
    id: +item.ID,
    title: `Заявка ${item.ID}`,
    price: Math.floor(Math.random() * (60000 - 10000 + 1) + 10000),
    source: JSON.parse(item.Source).Name,
    destination: JSON.parse(item.Target).Name,
    weight: JSON.parse(item.TotalCargo).TotalMass / 1000,
    parameters: `${item.UnitLength / 1000}x${item.UnitWidth / 1000}x${
      item.UnitHeight / 1000
    }`,
  }));
};

export { parseCarsFromAPI, parseCargosFromAPI };
