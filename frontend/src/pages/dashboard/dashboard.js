import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Performance } from "./sections/performance";
import { RiskAnalysis } from "./sections/riskAnalysis";
import { TradeLog } from "./sections/tradeLog";

export const Dashboard = () => {
  return (
    <Container>
      <Row>
        <Col md={5}>
          <Performance />
        </Col>
        <Col md={{ span: 5, offset: 2 }}>
          <RiskAnalysis />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <TradeLog />
        </Col>
      </Row>
    </Container>
  );
};
