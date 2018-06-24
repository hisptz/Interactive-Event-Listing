export const standardizeAnalytics = (analyticsObject: any) => {
  const { headers = [], metaData, rows = [], height, width } = analyticsObject;

  const { dimensions, items, names } = metaData;
  let newNames = names;
  let newDimensions = dimensions;
  if (items) {
    newNames = Object.assign({}, ...Object.keys(items).map(key => ({ [key]: items[key].name })));
  }
  if (!dimensions) {
    newDimensions = Object.assign(
      {},
      ...Object.keys(metaData)
        .filter(key => key !== 'names')
        .map(key => ({ [key]: metaData[key] }))
    );
  }

  return {
    headers,
    rows,
    height,
    width,
    metaData: {
      names: newNames,
      dimensions: newDimensions
    }
  };
};
