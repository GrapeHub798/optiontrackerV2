import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

export const WinLossPercentage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} />;

  const dispatch = useDispatch();
  const winLossPercentage = useSelector((x) => x.analysis.winLossPercentage);

  const fetchWinLossPercentage = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getWinLossPercentage({}));
  };

  const refreshData = async () => {
    await fetchWinLossPercentage();
  };

  useEffect(() => {
    if (!winLossPercentage) {
      fetchWinLossPercentage();
    }
    setIsLoading(false);
  }, [winLossPercentage]);

  return (
    <Card>
      <Card.Header>
        <span className="card-dashboard-font-size">Win/Lost Rate</span>
        <Button size="sm" variant="info" onClick={refreshData} className="ms-2">
          {refreshIcon}
        </Button>
      </Card.Header>
      <Card.Body>
        <>
          {isLoading && <Spinner animation="border" />}
          {!isLoading && winLossPercentage && (
            <Row>
              <Col className="text-end">
                <div>{`${winLossPercentage?.win_rate}%`}</div>
              </Col>
            </Row>
          )}
        </>
      </Card.Body>
    </Card>
  );
};
