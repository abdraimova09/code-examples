const transformSliderValue = (raw, max) => {
  return Math.round((max * raw) / 100);
};

export { transformSliderValue };
