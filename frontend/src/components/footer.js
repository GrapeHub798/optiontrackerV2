import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>OS Trade Journal</h5>
            <p className="p-0 m-0">
              Your trusted partner in trading excellence. Journey with us
              towards financial success.
            </p>
          </Col>
          <Col md={6}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="/contact" className="text-light">
                Contact Us
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p className="text-center">
              © {new Date().getFullYear()} OS Trade Journal. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
