import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

export const MostTradedByAmount = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} />;

  const dispatch = useDispatch();
  const mostTradedByAmount = useSelector((x) => x.analysis.mostTradedByAmount);

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const fetchMostTradedByAmount = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getMostTradedByAmount({}));
  };

  const refreshData = async () => {
    await fetchMostTradedByAmount();
  };

  useEffect(() => {
    if (!mostTradedByAmount) {
      fetchMostTradedByAmount();
    }
    setIsLoading(false);
  }, [mostTradedByAmount]);

  return (
    <Card>
      <Card.Header>
        <span className="card-dashboard-font-size">By Amount</span>
        <Button size="sm" variant="info" onClick={refreshData} className="ms-2">
          {refreshIcon}
        </Button>
      </Card.Header>
      <Card.Body>
        <>
          {isLoading && <Spinner animation="border" />}
          {!isLoading && mostTradedByAmount && (
            <Row>
              <Col>
                <div className="fw-bold">Stock</div>
                <hr />
                <div>{mostTradedByAmount?.stock}</div>
              </Col>
              <Col>
                <div className="fw-bold">Amount</div>
                <hr />
                <div>{USDollar.format(mostTradedByAmount?.trades)}</div>
              </Col>
            </Row>
          )}
        </>
      </Card.Body>
    </Card>
  );
};
