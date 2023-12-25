import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <Container className="my-5 text-center call-to-action">
      <Row>
        <Col>
          <h2>Join the Trading Revolution with OS Trade Journal</h2>
          <p>
            Ready to take your trading to the next level? OS Trade Journal is
            here to guide you on your journey to financial mastery. Don&apos;t
            miss out on the opportunity to transform your trading strategies
            with our powerful tools.
          </p>
          <Button as={Link} to="/register" variant="primary" size="lg">
            Start Your Journey
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CallToAction;
