export const tradesLast7Transformer = (dataObject, isDollar) => {
  if (!dataObject || !Array.isArray(dataObject)) {
    return {};
  }

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const labels = dataObject.map(
    (singleDay) => `${singleDay.day_of_week} - ${singleDay.date_formatted}`,
  );

  const colorArray = [
    "rgba(255, 99, 132)",
    "rgba(255, 159, 64)",
    "rgba(255, 205, 86)",
    "rgba(75, 192, 192)",
    "rgba(54, 162, 235)",
    "rgba(153, 102, 255)",
    "rgba(201, 203, 207)",
  ];

  const dataSets = dataObject.map((singleDay, idx) => {
    const displayData = isDollar
      ? parseFloat(singleDay.total).toFixed(2)
      : parseInt(singleDay.total);
    const labelData = isDollar
      ? USDollar.format(singleDay.total)
      : `${singleDay.total} Trades`;

    const arrayPad = new Array(idx).fill(null);

    return {
      label: labelData,
      data: [...arrayPad, displayData],
      backgroundColor: colorArray[idx],
    };
  });

  return {
    labels,
    datasets: dataSets,
  };
};
