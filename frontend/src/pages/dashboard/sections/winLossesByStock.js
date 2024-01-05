import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

export const WinLossesByStock = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} size="1x" />;

  const dispatch = useDispatch();
  const winLossesByStock = useSelector((x) => x.analysis.winLossesByStock);

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const fetchWinLossesByStock = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getWinLossesByStock({}));
  };

  const refreshData = async () => {
    await fetchWinLossesByStock();
  };

  useEffect(() => {
    if (!winLossesByStock) {
      fetchWinLossesByStock();
    }
    setIsLoading(false);
  }, [winLossesByStock]);

  const options = {
    responsive: true,
    type: "bar",
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return USDollar.format(parseFloat(context[0].raw));
          },
          label: function (context) {
            return "";
          },
        },
      },
    },
  };

  return (
    <Card>
      <Card.Header>
        Win/Loss By Stock{" "}
        <Button size="sm" variant="info" onClick={refreshData} className="ms-2">
          {refreshIcon}
        </Button>
      </Card.Header>
      <Card.Body className="bar-chart-height">
        <>
          {isLoading && <Spinner animation="border" />}
          {!isLoading && winLossesByStock && (
            <Bar options={options} data={winLossesByStock} />
          )}
        </>
      </Card.Body>
    </Card>
  );
};
