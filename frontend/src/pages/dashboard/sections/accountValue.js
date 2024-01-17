import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { analysisActions } from "../../../_store";

export const AccountValue = () => {
  const [isLoading, setIsLoading] = useState(true);

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} />;

  const dispatch = useDispatch();
  const accountValue = useSelector((x) => x.analysis.accountValue);

  const fetchAccountValue = async () => {
    setIsLoading(true);
    await dispatch(analysisActions.getAccountValue({}));
  };

  const refreshData = async () => {
    await fetchAccountValue();
  };

  useEffect(() => {
    if (!accountValue) {
      fetchAccountValue();
      return;
    }
    setIsLoading(false);
  }, [accountValue]);

  return (
    <Card>
      <Card.Header>
        <span className="card-dashboard-font-size">Account Value</span>
        <Button size="sm" variant="info" onClick={refreshData} className="ms-2">
          {refreshIcon}
        </Button>
      </Card.Header>
      <Card.Body>
        <>
          {isLoading && <Spinner animation="border" />}
          {!isLoading && accountValue && (
            <Row>
              <Col className="text-end">
                <div>{USDollar.format(accountValue?.total)}</div>
              </Col>
            </Row>
          )}
        </>
      </Card.Body>
    </Card>
  );
};
