export const performanceChartTransformer = (dataObject, isDollar) => {
  //the data will be an object with 3 properties

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const gains = isDollar
    ? USDollar.format(dataObject?.gain || 0)
    : dataObject?.gain || 0;
  const losses = isDollar
    ? USDollar.format(dataObject?.loss || 0)
    : dataObject?.loss || 0;
  const breakeven = isDollar
    ? USDollar.format(dataObject?.breakeven || 0)
    : dataObject?.breakeven || 0;

  return {
    labels: [
      `Gains: ${gains}`,
      `Losses: ${losses}`,
      `Break Even: ${breakeven}`,
    ],
    datasets: [
      {
        data: [
          dataObject?.gain || 0,
          dataObject?.loss || 0,
          dataObject?.breakeven || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
