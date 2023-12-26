import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { displayError } from "../../../_helpers/errorhelper";
import { userActions } from "../../../_store";

const ChangePasswordModal = ({ show, onHide }) => {
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Password is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmNewPassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .notOneOf([Yup.ref("currentPassword")], "Password must be different"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [backdropValue, setBackdropValue] = useState("false");
  const [enableKeyboard, setEnableKeyboard] = useState(true);

  const dispatch = useDispatch();
  const userError = useSelector((x) => x.user.error);
  const changeSuccess = useSelector((x) => x.user.success);

  useEffect(() => {
    if (changeSuccess) {
      setIsSaving(false);
      setIsSaved(true);
      setBackdropValue("false");
      setEnableKeyboard(true);
      setTimeout(() => hideResetForm(), 2000);
    }
  }, [changeSuccess]);

  useEffect(() => {
    if (userError) {
      setIsSaving(false);
    }
  }, [userError]);
  const onSubmit = async ({ currentPassword, newPassword }) => {
    setIsSaving(true);
    setBackdropValue("static");
    setEnableKeyboard(false);
    await dispatch(userActions.resetStatus());
    await dispatch(
      userActions.changePassword({
        oldPassword: currentPassword,
        newPassword,
      }),
    );
  };

  const cancelModal = () => {
    if (!isSaving && !isSaved) {
      onHide();
    }
  };

  const hideResetForm = () => {
    setIsSaved(false);
    dispatch(userActions.resetStatus());
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      keyboard={enableKeyboard}
      backdrop={backdropValue}
    >
      <Modal.Header>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSaving && (
          <div className="text-center">
            <Spinner animation="border" />
            <p className="mt-2">Saving preferences...</p>
          </div>
        )}
        {isSaved && (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
            <p className="mt-2">Preferences Saved Successfully!</p>
          </div>
        )}
        {!isSaving && !isSaved && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                {...register("currentPassword")}
                required
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                {...register("newPassword")}
                required
                className={`form-control ${
                  errors.newPassword ? "is-invalid" : ""
                }`}
              />
              <Form.Control.Feedback type="invalid">
                {errors.newPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                {...register("confirmNewPassword")}
                required
                className={`form-control ${
                  errors.confirmNewPassword ? "is-invalid" : ""
                }`}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmNewPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            {userError && (
              <Alert variant="danger" className="my-3" dismissible>
                {displayError(userError)}
              </Alert>
            )}
            <Button className="mt-4" variant="primary" type="submit">
              Change Password
            </Button>
            <Button
              className="mt-4 ms-4"
              variant="danger"
              type="button"
              onClick={cancelModal}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default ChangePasswordModal;
