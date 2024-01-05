import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
export const TradesLast7Amount = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} size="1x" />;

  const dispatch = useDispatch();
  const tradesLast7Amount = useSelector((x) => x.analysis.tradesLast7Amount);

  const fetchTradesLast7Amount = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getTradesLast7Amount({}));
  };

  const refreshData = async () => {
    await fetchTradesLast7Amount();
  };

  useEffect(() => {
    if (!tradesLast7Amount) {
      fetchTradesLast7Amount();
    }
    setIsLoading(false);
  }, [tradesLast7Amount]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `$${context[0].formattedValue}`;
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
        Trades Last 7 Days - Amounts{" "}
        <Button size="sm" variant="info" onClick={refreshData} className="ms-2">
          {refreshIcon}
        </Button>
      </Card.Header>
      <Card.Body className="bar-chart-height">
        <>
          {isLoading && <Spinner animation="border" />}
          {!isLoading && tradesLast7Amount && (
            <Bar options={options} data={tradesLast7Amount} />
          )}
        </>
      </Card.Body>
    </Card>
  );
};
