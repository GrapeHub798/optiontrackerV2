import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Alert, Col, Modal, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import { displayError } from "../../../../_helpers/errorhelper";
import { tradesActions } from "../../../../_store";
import { refreshGridsAndCharts } from "../../refreshGridsCharts";

export const DeleteTradeModal = ({ show, onHide, listOfTrades }) => {
  const [backdropValue, setBackdropValue] = useState("false");
  const [enableKeyboard, setEnableKeyboard] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();
  const tradesError = useSelector((x) => x.trades.error);

  const handleDelete = async () => {
    if (!listOfTrades || listOfTrades.length === 0) {
      return;
    }

    setIsSaving(true);
    setBackdropValue("static");
    setEnableKeyboard(false);

    const itemIds = listOfTrades.map((singleTrade) => singleTrade.tradeId);

    await dispatch(tradesActions.deleteMultipleTrades({ itemIds }));

    setIsSaving(false);
    setIsSaved(true);
    await dispatch(tradesActions.getTrades({}));
    await refreshGridsAndCharts();
    setBackdropValue("false");
    setEnableKeyboard(true);
    setTimeout(() => onHide(true), 2000);
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      keyboard={enableKeyboard}
      backdrop={backdropValue}
    >
      <Modal.Header>
        <Modal.Title>Delete Trade(s)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSaving && (
          <div className="text-center">
            <Spinner animation="border" />
            <p className="mt-2">Deleting Trade(s)...</p>
          </div>
        )}
        {isSaved && (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
            <p className="mt-2">Trade(s) Deleted Successfully!</p>
          </div>
        )}
        {!isSaving && !isSaved && (
          <>
            <Row>
              <Col>
                <p>Delete {listOfTrades.length} trade(s)?</p>
              </Col>
            </Row>
            {tradesError && (
              <Alert variant="danger" className="my-3" dismissible>
                {displayError(tradesError)}
              </Alert>
            )}
            <Row className="mt-2">
              <Col
                className="mt-2"
                sm={{ span: 2, offset: 8 }}
                md={{ span: 1, offset: 9 }}
              >
                <Button onClick={onHide} size="sm" variant="warning">
                  No
                </Button>
              </Col>
              <Col className="mt-2">
                <Button onClick={handleDelete} size="sm" variant="danger">
                  Yes
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

DeleteTradeModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  listOfTrades: PropTypes.array,
};
