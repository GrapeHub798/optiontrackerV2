export const winLossByStockTransformer = (dataObject) => {
  if (!dataObject || !Array.isArray(dataObject)) {
    return {};
  }

  const labels = dataObject.map((singleDay) => singleDay.ticker);

  const gains = dataObject.map((singleTicker) => singleTicker.gains);
  const losses = dataObject.map((singleTicker) => singleTicker.losses);

  return {
    labels,
    datasets: [
      {
        label: "Gains",
        data: gains,
        backgroundColor: "rgba(255, 99, 132)",
        borderWidth: 1,
        borderSkipped: false,
      },
      {
        label: "Losses",
        data: losses,
        backgroundColor: "rgba(153, 102, 255)",
        borderWidth: 1,
        borderSkipped: false,
      },
    ],
  };
};
