import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { displayError } from "../../../_helpers/errorhelper";
import { brokersActions } from "../../../_store";

const DeleteBrokerModal = ({ show, onHideParent, broker }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [backdropValue, setBackdropValue] = useState("false");
  const [enableKeyboard, setEnableKeyboard] = useState(true);

  const dispatch = useDispatch();
  const brokerDeleteError = useSelector((x) => x.brokers.error);
  const brokerDeleteSuccess = useSelector((x) => x.brokers.success);

  const getUpdatedBrokers = useCallback(async () => {
    await dispatch(brokersActions.getAllBroker());
    setIsDeleting(false);
    setIsDeleted(true);
    setBackdropValue("false");
    setEnableKeyboard(true);
    setTimeout(() => hideResetDeleteBrokerModal(), 2000);
  }, [brokerDeleteSuccess]);

  useEffect(() => {
    if (brokerDeleteSuccess) {
      getUpdatedBrokers();
    }
  }, [brokerDeleteSuccess]);

  useEffect(() => {
    if (brokerDeleteError) {
      setIsDeleting(false);
    }
  }, [brokerDeleteError]);

  const hideResetDeleteBrokerModal = async () => {
    await dispatch(brokersActions.resetStatus());
    onHideParent();
  };
  const onHide = async () => {
    if (!isDeleting && !isDeleted) {
      await hideResetDeleteBrokerModal();
    }
  };

  const deleteBroker = async () => {
    setIsDeleting(true);
    setBackdropValue("static");
    setEnableKeyboard(false);
    await dispatch(brokersActions.deleteBroker({ brokerId: broker.brokerId }));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      keyboard={enableKeyboard}
      backdrop={backdropValue}
    >
      <Modal.Header closeButton>
        <Modal.Title>Brokers</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isDeleting && (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Deleting Broker...</p>
          </div>
        )}
        {isDeleted && (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
            <p className="mt-2">Broker Deleted Successfully!</p>
          </div>
        )}
        {!isDeleting && !isDeleted && (
          <>
            <Row>
              <Col>Delete Broker with name {broker.brokerName}</Col>
            </Row>
            <Row>
              <Col>
                {brokerDeleteError && (
                  <Alert variant="danger" className="my-3" dismissible>
                    {displayError(brokerDeleteError)}
                  </Alert>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 2, offset: 8 }}>
                <Button variant="info" onClick={onHide}>
                  No
                </Button>
              </Col>
              <Col>
                <Button variant="warning" onClick={deleteBroker}>
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

DeleteBrokerModal.propTypes = {
  show: PropTypes.bool,
  onHideParent: PropTypes.func,
  broker: PropTypes.object,
};

export default DeleteBrokerModal;
