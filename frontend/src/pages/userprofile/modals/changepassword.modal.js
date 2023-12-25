import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

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
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit = (data) => {
    console.log(data);
    onHide(); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              {...register("currentPassword")}
              required
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
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
          <Button
            className="mt-4"
            disabled={isSubmitting}
            variant="primary"
            type="submit"
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Change Password
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default ChangePasswordModal;
