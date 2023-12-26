import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { userActions } from "../_store";
import { APP_URL_PATHS } from "../shared/sharedConstants";

export const Navigation = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((x) => x.user.user);

  const logout = (e) => {
    e.preventDefault();
    if (!authUser?.userId) {
      return;
    }
    dispatch(userActions.logout());
  };

  return (
    <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to={APP_URL_PATHS.HOME}>
          <h3>OS Trade Journal</h3>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-start">
          <Navbar.Text className="ms-5">
            {authUser?.userId && (
              <Nav className="me-auto">
                <Nav.Link as={Link} to={APP_URL_PATHS.DASHBOARD} href="#">
                  Dashboard
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {authUser?.userId && (
            <>
              <Navbar.Text className="me-2">
                Signed in as:{" "}
                <Link to={APP_URL_PATHS.USERPROFILE}>{authUser.email}</Link>
              </Navbar.Text>
              <Navbar.Text>
                <span className="pointer-class" onClick={logout}>
                  Logout
                </span>
              </Navbar.Text>
            </>
          )}
          {!authUser && (
            <>
              <Navbar.Text className="me-2">
                <Link to={APP_URL_PATHS.LOGIN}>Login</Link>
              </Navbar.Text>
              <Navbar.Text>
                <Link to={APP_URL_PATHS.REGISTER}>Register</Link>
              </Navbar.Text>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
