import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

ChartJS.register(ArcElement, Tooltip, Legend);
export const PerformanceByAmount = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} size="1x" />;

  const dispatch = useDispatch();
  const performanceByAmountData = useSelector(
    (x) => x.analysis.performanceByAmountData,
  );

  const fetchPerformanceByAmountData = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getPerformanceByAmountData({}));
  };

  const refreshData = async () => {
    await fetchPerformanceByAmountData();
  };

  useEffect(() => {
    if (!performanceByAmountData) {
      fetchPerformanceByAmountData();
    }
    setIsLoading(false);
  }, [performanceByAmountData]);

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
        Performance By Amount{" "}
        <Button size="sm" variant="info" onClick={refreshData} className="ms-2">
          {refreshIcon}
        </Button>
      </Card.Header>
      <Card.Body>
        <>
          {isLoading && <Spinner animation="border" />}
          {!isLoading && performanceByAmountData && (
            <Pie data={performanceByAmountData} options={options} />
          )}
        </>
      </Card.Body>
    </Card>
  );
};
