import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { displayError } from "../../../../_helpers/errorhelper";
import { journalActions } from "../../../../_store";
import { refreshTradeTable } from "../../refreshGridsCharts";

export const AddJournalEntry = ({ show, onHide, trade }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [backdropValue, setBackdropValue] = useState("false");
  const [enableKeyboard, setEnableKeyboard] = useState(true);

  const dispatch = useDispatch();

  const journalError = useSelector((x) => x.journal.error);
  const journalSuccess = useSelector((x) => x.journal.success);

  const validationSchema = Yup.object().shape({
    journalEntry: Yup.string().required("Journal Entry is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (journalSuccess) {
      setIsSaving(false);
      setIsSaved(true);
      dispatch(journalActions.resetStatus());
      refreshTradeTable();
      setBackdropValue("false");
      setEnableKeyboard(true);
      setTimeout(() => onHide(), 2000);
    }
  }, [journalSuccess]);

  useEffect(() => {
    if (journalError) {
      setIsSaving(false);
    }
  }, [journalError]);
  const onSubmit = async ({ journalEntry }) => {
    setIsSaving(true);
    setBackdropValue("static");
    setEnableKeyboard(false);
    await dispatch(
      journalActions.saveJournalEntry({
        entry: journalEntry,
        tradeId: trade.tradeId,
      }),
    );
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
        <Modal.Title>Add Trade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSaving && (
          <div className="text-center">
            <Spinner animation="border" />
            <p className="mt-2">Saving Journal Entry...</p>
          </div>
        )}
        {isSaved && (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
            <p className="mt-2">Journal Entry Saved Successfully!</p>
          </div>
        )}
        {!isSaving && !isSaved && (
          <>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label>Journal Entry:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  placeholder="Details about your trades..."
                  name="journalEntry"
                  {...register("journalEntry")}
                  className={`form-control ${
                    errors.journalEntry ? "is-invalid" : ""
                  }`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.journalEntry?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {journalError && (
                <Alert variant="danger" className="my-3" dismissible>
                  {displayError(journalError)}
                </Alert>
              )}
              <Row className="mt-2">
                <Col className="text-end">
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Save Entry
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

AddJournalEntry.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  trade: PropTypes.object,
};
