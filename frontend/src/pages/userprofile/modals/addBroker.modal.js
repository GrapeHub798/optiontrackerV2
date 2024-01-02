import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { displayError } from "../../../_helpers/errorhelper";
import { brokersActions } from "../../../_store";

const AddBrokerModal = ({ show, onHideParent }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [backdropValue, setBackdropValue] = useState("false");
  const [enableKeyboard, setEnableKeyboard] = useState(true);

  const dispatch = useDispatch();
  const brokerSaveError = useSelector((x) => x.brokers.error);
  const brokerSaveSuccess = useSelector((x) => x.brokers.success);

  const validationSchema = Yup.object().shape({
    brokerName: Yup.string().required("Name is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async ({ brokerName, brokerOptionFee, brokerStockFee }) => {
    setIsSaving(true);
    setBackdropValue("static");
    setEnableKeyboard(false);

    //convert the fees to decimals or 0
    const optionFee = isNaN(parseFloat(brokerOptionFee))
      ? 0.0
      : parseFloat(brokerOptionFee);

    const stockFee = isNaN(parseFloat(brokerStockFee))
      ? 0.0
      : parseFloat(brokerStockFee);

    await dispatch(
      brokersActions.createBroker({
        brokerName,
        brokerOptionFee: optionFee,
        brokerStockFee: stockFee,
      }),
    );
  };

  const getUpdatedBrokers = useCallback(async () => {
    await dispatch(brokersActions.getAllBroker());
    setIsSaving(false);
    setIsSaved(true);
    setBackdropValue("false");
    setEnableKeyboard(true);
    setTimeout(() => hideResetAddBrokerModal(), 2000);
  }, [brokerSaveSuccess]);

  useEffect(() => {
    if (brokerSaveSuccess) {
      getUpdatedBrokers();
    }
  }, [brokerSaveSuccess]);

  useEffect(() => {
    if (brokerSaveError) {
      setIsSaving(false);
    }
  }, [brokerSaveError]);

  const hideResetAddBrokerModal = async () => {
    await dispatch(brokersActions.resetStatus());
    onHideParent();
  };
  const onHide = async () => {
    if (!isSaving && !isSaved) {
      await hideResetAddBrokerModal();
    }
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
        {isSaving && (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Saving Broker...</p>
          </div>
        )}
        {isSaved && (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
            <p className="mt-2">Broker Saved Successfully!</p>
          </div>
        )}
        {!isSaving && !isSaved && (
          <>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label>Broker Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("brokerName")}
                  required
                  className={`form-control ${
                    errors.brokerName ? "is-invalid" : ""
                  }`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.brokerName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Option Fee</Form.Label>
                <Form.Control type="text" {...register("brokerOptionFee")} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Broker Stock Fee</Form.Label>
                <Form.Control type="text" {...register("brokerStockFee")} />
              </Form.Group>
              {brokerSaveError && (
                <Alert variant="danger" className="my-3" dismissible>
                  {displayError(brokerSaveError)}
                </Alert>
              )}
              <Button className="mt-4" variant="primary" type="submit">
                Save
              </Button>
              <Button
                className="mt-4 ms-4"
                variant="danger"
                type="button"
                onClick={onHide}
              >
                Cancel
              </Button>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

AddBrokerModal.propTypes = {
  show: PropTypes.bool,
  onHideParent: PropTypes.func,
};

export default AddBrokerModal;
