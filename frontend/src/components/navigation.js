import "./navigation.css";

import {
  faAddressCard,
  faGaugeHigh,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { userActions } from "../_store";
import { APP_URL_PATHS } from "../shared/sharedConstants";

export const Navigation = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((x) => x.user.user);

  const dashboardIcon = <FontAwesomeIcon icon={faGaugeHigh} size={"1x"} />;
  const profileIcon = <FontAwesomeIcon icon={faAddressCard} size={"1x"} />;
  const logoutIcon = <FontAwesomeIcon icon={faRightFromBracket} size={"1x"} />;

  const logout = (e) => {
    e.preventDefault();
    if (!authUser?.userId) {
      return;
    }
    dispatch(userActions.logout());
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to={APP_URL_PATHS.HOME}>
          <h3>OS Trade Journal</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {authUser?.userId && (
              <>
                <Navbar.Text className="ms-5">
                  <Nav.Link as={Link} to={APP_URL_PATHS.DASHBOARD} href="#">
                    {dashboardIcon} Dashboard
                  </Nav.Link>
                </Navbar.Text>
                <Navbar.Text className="ms-5">
                  <Nav.Link as={Link} to={APP_URL_PATHS.USERPROFILE} href="#">
                    {profileIcon} Profile
                  </Nav.Link>
                </Navbar.Text>
              </>
            )}
          </Nav>
          <Nav className="justify-content-end">
            {authUser?.userId && (
              <>
                <Navbar.Text className="me-5 d-none d-sm-none d-md-block">
                  Signed in as:{" "}
                  <span className="logged-in-text">{authUser.email}</span>
                </Navbar.Text>
                <Navbar.Text className="text-end">
                  <span
                    className="pointer-class logged-in-text"
                    onClick={logout}
                  >
                    {logoutIcon} Logout
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
