import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

import metricsGraphImage from "../../../_assets/images/home/luke-chesser-JKUTrJ4vK00-unsplash.jpg"; // Replace with your image path

const Metrics = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-4">
        <Col lg={8}>
          <h2 className="text-center">
            Transform Data into Success with Advanced Metrics
          </h2>
          <p className="text-center">
            Discover how OS Trade Journal&apos;s real-time analytics and
            insightful metrics can elevate your trading strategy to new heights.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Image fluid variant="top" src={metricsGraphImage} />
          <figcaption>
            <i className="photo-credit">
              <a
                target="_blank"
                href="https://unsplash.com/@lukechesser"
                rel="noreferrer"
              >
                Photo By Luke Chesser
              </a>
            </i>
          </figcaption>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Visual Analytics</Card.Title>
              <Card.Text>
                Dive into visually stunning analytics and understand your
                trading patterns at a glance.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Customizable Reports</Card.Title>
              <Card.Text>
                Create and customize reports to focus on the metrics that matter
                most to you.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Interactive Dashboards</Card.Title>
              <Card.Text>
                Interact with your data through dynamic dashboards, helping you
                make informed decisions swiftly.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Risk Analysis Tools</Card.Title>
              <Card.Text>
                Assess and manage your risk with sophisticated tools, keeping
                your strategy sharp and effective.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Metrics;
