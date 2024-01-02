import "./login.css";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { userActions } from "../../_store";
import { APP_URL_PATHS } from "../../shared/sharedConstants";

export const Login = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((x) => x.user.user);
  const authError = useSelector((x) => x.user.error);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser?.userId) {
      return;
    }
    if (authUser?.userId) navigate(APP_URL_PATHS.WELCOME);
  }, [authUser]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email Address is required").email(),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit = ({ email, password }) => {
    return dispatch(userActions.login({ email, password }));
  };

  const displayError = (errorMessages) => {
    if (!errorMessages) {
      return;
    }

    if (Array.isArray(errorMessages) && errorMessages.length > 0) {
      return (
        <ul className="form-errors">
          {errorMessages.map((singleMessage, idx) => (
            <li key={idx}>{singleMessage}</li>
          ))}
        </ul>
      );
    }
    return (
      <ul className="form-errors">
        <li>{errorMessages}</li>
      </ul>
    );
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="mt-5">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <Card.Header>
                <h4>Login</h4>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Email Address:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="example@email.com"
                    name="email"
                    {...register("email")}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    name="password"
                    {...register("password")}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                {authError && (
                  <Alert variant="danger" className="my-3" dismissible>
                    {displayError(authError)}
                  </Alert>
                )}
                <Button disabled={isSubmitting} variant="primary" type="submit">
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Login
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
