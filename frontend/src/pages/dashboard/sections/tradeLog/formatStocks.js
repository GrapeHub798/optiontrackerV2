export const formatStocks = (data) => {
  return data.map(formatSingleStock);
};

export const formatSingleStock = (item) => {
  return {
    original: item,
    label: `${item.stockName} - ${item.ticker}`,
    value: item.ticker,
  };
};
