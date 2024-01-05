import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

export const MostTradedByTrades = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} />;

  const dispatch = useDispatch();
  const mostTradedByTrades = useSelector((x) => x.analysis.mostTradedByTrades);

  const fetchMostTradedByTrades = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getMostTradedByTrades({}));
  };

  const refreshData = async () => {
    await fetchMostTradedByTrades();
  };

  useEffect(() => {
    if (!mostTradedByTrades) {
      fetchMostTradedByTrades();
    }
    setIsLoading(false);
  }, [mostTradedByTrades]);

  return (
    <Card>
      <Card.Header>
        <span className="card-dashboard-font-size">By Trades</span>
        <Button size="sm" variant="info" onClick={refreshData} className="ms-2">
          {refreshIcon}
        </Button>
      </Card.Header>
      <Card.Body>
        <>
          {isLoading && <Spinner animation="border" />}
          {!isLoading && mostTradedByTrades && (
            <Row>
              <Col>
                <div className="fw-bold">Stock</div>
                <hr />
                <div>{mostTradedByTrades?.stock}</div>
              </Col>
              <Col>
                <div className="fw-bold">Trades</div>
                <hr />
                <div>{mostTradedByTrades?.trades}</div>
              </Col>
            </Row>
          )}
        </>
      </Card.Body>
    </Card>
  );
};
