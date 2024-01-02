export const formatStocks = (data) => {
  return data.map((item) => ({
    original: item,
    label: `${item.stockName} - ${item.ticker}`,
    value: item.ticker,
  }));
};
