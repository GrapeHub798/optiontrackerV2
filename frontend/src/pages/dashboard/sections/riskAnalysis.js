import React, { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

export const RiskAnalysis = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card>
      <Card.Header>Risk Analysis</Card.Header>
      <Card.Body>
        {isLoading ? <Spinner animation="border" /> : <Bar data={null} />}
      </Card.Body>
    </Card>
  );
};
