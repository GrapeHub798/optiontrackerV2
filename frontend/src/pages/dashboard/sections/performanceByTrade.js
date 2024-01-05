import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

ChartJS.register(ArcElement, Tooltip, Legend);
export const PerformanceByTrade = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} size="1x" />;

  const dispatch = useDispatch();
  const performanceByTradeData = useSelector(
    (x) => x.analysis.performanceByTradeData,
  );

  const fetchPerformanceByTradeData = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getPerformanceByTradeData({}));
  };

  const refreshData = async () => {
    await fetchPerformanceByTradeData();
  };

  useEffect(() => {
    if (!performanceByTradeData) {
      fetchPerformanceByTradeData();
    }
    setIsLoading(false);
  }, [performanceByTradeData]);

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          let label = data.labels[tooltipItem.index] || "";
          let value = data.datasets[0].data[tooltipItem.index];
          return `${label}: ${value}`;
        },
      },
    },
  };

  return (
    <Card>
      <Card.Header>
        Performance By Trade{" "}
        <Button size="sm" variant="info" onClick={refreshData} className="ms-2">
          {refreshIcon}
        </Button>
      </Card.Header>
      <Card.Body>
        <>
          {isLoading && <Spinner animation="border" />}
          {!isLoading && performanceByTradeData && (
            <Pie data={performanceByTradeData} options={options} />
          )}
        </>
      </Card.Body>
    </Card>
  );
};
