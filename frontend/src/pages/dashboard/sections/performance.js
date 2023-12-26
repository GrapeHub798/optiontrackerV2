import React, { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { Pie } from "react-chartjs-2";

export const Performance = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Card>
      <Card.Header>Performance Overview</Card.Header>
      <Card.Body>
        {isLoading ? <Spinner animation="border" /> : <Pie data={null} />}
      </Card.Body>
    </Card>
  );
};
