export const winLossesByStockTransformer = (dataObject) => {
  if (!dataObject || !Array.isArray(dataObject)) {
    return {};
  }

  const labels = dataObject.map((singleDay) => singleDay.ticker);

  const colorArray = [
    "rgba(255, 99, 132)",
    "rgba(255, 159, 64)",
    "rgba(255, 205, 86)",
    "rgba(75, 192, 192)",
    "rgba(54, 162, 235)",
    "rgba(153, 102, 255)",
    "rgba(201, 203, 207)",
  ];

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
        backgroundColor: "rgba(255, 159, 64)",
        borderWidth: 1,
        borderSkipped: false,
      },
    ],
  };
};
