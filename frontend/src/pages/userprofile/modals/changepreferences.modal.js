import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { displayError } from "../../../_helpers/errorhelper";
import { exchangesActions } from "../../../_store";

const ChangePreferencesModal = ({ show, onHide }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gettingExchange, setGettingExchanges] = useState(false);

  const dispatch = useDispatch();
  const exchanges = useSelector((x) => x.exchanges.exchanges);
  const exchangesError = useSelector((x) => x.exchanges.error);

  const fetchExchanges = async () => {
    setIsLoading(true);
    setGettingExchanges(true);
    await dispatch(exchangesActions.getExchanges());
  };
  useEffect(() => {
    if (!exchanges && !gettingExchange) {
      fetchExchanges();
    }
  }, []);

  useEffect(() => {
    if (!exchanges) {
      return;
    }
    setGettingExchanges(false);
    setIsLoading(false);
  }, [exchanges]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Preferences saved");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Change Preferences</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading preferences...</p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Preferred Stock Exchange</Form.Label>
              <Form.Control as="select" defaultValue="US">
                <option value="US">US</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Preferred Language</Form.Label>
              <Form.Control as="select" defaultValue="en-US">
                <option value="en-US">US English</option>
              </Form.Control>
            </Form.Group>
            {exchangesError && (
              <Alert variant="danger" className="my-3" dismissible>
                {displayError(exchangesError)}
              </Alert>
            )}
            <Button className="mt-4" variant="primary" type="submit">
              Save Preferences
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

ChangePreferencesModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default ChangePreferencesModal;
