export const mergeAnalytics = (analyticsArray: any[]) => {
  const arrayToObject = (row, headers, names) =>
    Object.assign({}, ...row.map((item, index) => ({ [headers[index].column]: names[item] || item })));
  const analyticObject = { dataObject: [], dimensions: {}, names: {} };
  const headers = analyticsArray
    .map(analytic => {
      const { headers, rows, metaData } = analytic;
      const { names, dimensions } = metaData;
      const dataObjet = rows.map(row => arrayToObject(row, headers, names));
      analyticObject.dataObject = [...(analyticObject.dataObject || []), ...dataObjet];
      analyticObject.dimensions = { ...(analyticObject.dimensions || {}), ...dimensions };
      analyticObject.names = { ...(analyticObject.names || {}), ...names };
      return headers;
    })
    .reduce((acc, cur) => acc.concat(cur), [])
    .filter((thing, index, self) => self.findIndex(t => t.column === thing.column && t.name === thing.name) === index);
  const data = analyticObject.dataObject.map(row =>
    Object.assign(
      {},
      ...headers.map(({ column }) => ({
        [column]: row[column] || ''
      }))
    )
  );
  return { headers, data };
};
