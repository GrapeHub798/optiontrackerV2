import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

export const MostTradedByQuantity = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} />;

  const dispatch = useDispatch();
  const mostTradedByQuantity = useSelector(
    (x) => x.analysis.mostTradedByQuantity,
  );

  const fetchMostTradedByQuantity = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getMostTradedByQuantity({}));
  };

  const refreshData = async () => {
    await fetchMostTradedByQuantity();
  };

  useEffect(() => {
    if (!mostTradedByQuantity) {
      fetchMostTradedByQuantity();
    }
    setIsLoading(false);
  }, [mostTradedByQuantity]);

  return (
    <Card>
      <Card.Header>
        <span className="card-dashboard-font-size">By Quantity</span>
        <Button size="sm" variant="info" onClick={refreshData} className="ms-2">
          {refreshIcon}
        </Button>
      </Card.Header>
      <Card.Body>
        <>
          {isLoading && <Spinner animation="border" />}
          {!isLoading && mostTradedByQuantity && (
            <Row>
              <Col>
                <div className="fw-bold">Stock</div>
                <hr />
                <div>{mostTradedByQuantity?.stock}</div>
              </Col>
              <Col>
                <div className="fw-bold">Quantity</div>
                <hr />
                <div>{mostTradedByQuantity?.trades}</div>
              </Col>
            </Row>
          )}
        </>
      </Card.Body>
    </Card>
  );
};
