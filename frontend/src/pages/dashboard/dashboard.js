import "./dashboard.css";

import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import { LoadUserInfo } from "./loadUserInfo";
import { AccountValue } from "./sections/accountValue";
import { MostTradedByAmount } from "./sections/mostTradedByAmount";
import { MostTradedByQuantity } from "./sections/mostTradedByQuantity";
import { MostTradedByTrades } from "./sections/mostTradedByTrades";
import { PerformanceByAmount } from "./sections/performanceByAmount";
import { PerformanceByTrade } from "./sections/performanceByTrade";
import { TradeLog } from "./sections/tradeLog/tradeLog";
import { TradesLast7 } from "./sections/tradesLast7";
import { TradesLast7Amount } from "./sections/tradesLast7Amount";
import { WinLossesByStock } from "./sections/winLossesByStock";

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
            <Col md={6}>
              <Row>
                <Col md={6}>
                  <PerformanceByTrade />
                </Col>
                <Col md={6}>
                  <PerformanceByAmount />
                </Col>
              </Row>
              <Row className="mt-2">
                <hr />
                <Col className="text-center">
                  <h4>Most Traded Stocks</h4>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={4}>
                  <MostTradedByQuantity />
                </Col>
                <Col md={4}>
                  <MostTradedByTrades />
                </Col>
                <Col md={4}>
                  <MostTradedByAmount />
                </Col>
              </Row>
              <Row>
                <hr />
                <Col className="text-center">
                  <h4>Account Value</h4>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <AccountValue />
                </Col>
                <Col md={8}></Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                <Col>
                  <TradesLast7 />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <TradesLast7Amount />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <WinLossesByStock />
                </Col>
              </Row>
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
