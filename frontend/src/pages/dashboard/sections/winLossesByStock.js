import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

export const WinLossesByStock = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} size="1x" />;

  const dispatch = useDispatch();
  const winLossByStock = useSelector((x) => x.analysis.winLossByStock);

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const fetchWinLossByStock = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getWinLossByStock({}));
  };

  const refreshData = async () => {
    await fetchWinLossByStock();
  };

  useEffect(() => {
    if (!winLossByStock) {
      fetchWinLossByStock();
    }
    setIsLoading(false);
  }, [winLossByStock]);

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
          {!isLoading && winLossByStock && (
            <Bar options={options} data={winLossByStock} />
          )}
        </>
      </Card.Body>
    </Card>
  );
};
