import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import { LoadUserInfo } from "./loadUserInfo";
import { Performance } from "./sections/performance";
import { RiskAnalysis } from "./sections/riskAnalysis";
import { TradeLog } from "./sections/tradeLog/tradeLog";

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLoadingText, setCurrentLoadingText] = useState("");

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" />
          <p>{`Loading ${currentLoadingText}...`}</p>
        </div>
      )}
      <LoadUserInfo
        isLoading={isLoading}
        changeLoadingStatus={setIsLoading}
        changeLoadingText={setCurrentLoadingText}
      />
      {!isLoading && (
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
      )}
    </>
  );
};
