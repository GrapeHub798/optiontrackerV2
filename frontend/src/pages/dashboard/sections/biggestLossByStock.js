import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

export const BiggestLossByStock = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} />;

  const dispatch = useDispatch();
  const biggestLossByStock = useSelector((x) => x.analysis.biggestLossByStock);

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const fetchBiggestLossByStock = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getBiggestLossByStock({}));
  };

  const refreshData = async () => {
    await fetchBiggestLossByStock();
  };

  useEffect(() => {
    if (!biggestLossByStock) {
      fetchBiggestLossByStock();
    }
    setIsLoading(false);
  }, [biggestLossByStock]);

  return (
    <Card>
      <Card.Header>
        <span className="card-dashboard-font-size">Biggest Loser</span>
        <Button size="sm" variant="info" onClick={refreshData} className="ms-2">
          {refreshIcon}
        </Button>
      </Card.Header>
      <Card.Body>
        <>
          {isLoading && <Spinner animation="border" />}
          {!isLoading && biggestLossByStock && (
            <Row>
              <Col>
                <div>{biggestLossByStock?.ticker}</div>
              </Col>
              <Col>
                <div>{USDollar.format(biggestLossByStock?.total_losses)}</div>
              </Col>
            </Row>
          )}
        </>
      </Card.Body>
    </Card>
  );
};
