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

export const EditDeleteJournalEntry = ({ show, onHide, trade }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [deletePressed, setDeletePressed] = useState(false);

  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      if (deletePressed) {
        setIsDeleting(false);
        setIsDeleted(true);
        setDeletePressed(false);
      } else {
        setIsSaving(false);
        setIsSaved(true);
      }
      dispatch(journalActions.resetStatus());
      refreshTradeTable();
      setBackdropValue("false");
      setEnableKeyboard(true);
      setTimeout(() => onHide(), 2000);
    }
  }, [journalSuccess]);

  useEffect(() => {
    if (journalError) {
      if (deletePressed) {
        setIsDeleting(false);
      } else {
        setIsSaving(false);
      }
    }
  }, [journalError]);
  const onSubmit = async ({ journalEntry }) => {
    setIsSaving(true);
    setBackdropValue("static");
    setEnableKeyboard(false);
    await dispatch(
      journalActions.editJournalEntry({
        journalId: trade.journalId,
        entry: journalEntry,
        tradeId: trade.tradeId,
      }),
    );
  };

  const deleteEntry = async () => {
    setDeletePressed(true);
    setIsDeleting(true);
    setBackdropValue("static");
    setEnableKeyboard(false);

    const itemIds = [trade.journalId];

    await dispatch(journalActions.deleteJournalEntry({ itemIds }));
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
        <Modal.Title>Edit/Delete Journal Entry</Modal.Title>
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
        {isDeleting && (
          <div className="text-center">
            <Spinner animation="border" />
            <p className="mt-2">Deleting Journal Entry...</p>
          </div>
        )}
        {isDeleted && (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
            <p className="mt-2">Journal Entry Deleted Successfully!</p>
          </div>
        )}
        {!isSaving && !isSaved && !isDeleting && !isDeleted && (
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
                  {...register("journalEntry", {
                    value: trade?.journal?.journalEntry,
                  })}
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
                  <Button
                    disabled={isDeleting}
                    type="button"
                    onClick={deleteEntry}
                  >
                    {isDeleting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Delete Entry
                  </Button>
                </Col>
                <Col className="text-start">
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Edit Entry
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

EditDeleteJournalEntry.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  trade: PropTypes.object,
};
