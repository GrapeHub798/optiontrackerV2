import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import firstImage from "../../../_assets/images/home/adam-smigielski-K5mPtONmpHM-unsplash.jpg";
import fifthImage from "../../../_assets/images/home/blogging-guide-K5DY18hy5JQ-unsplash.jpg";
import thirdImage from "../../../_assets/images/home/clay-banks-LjqARJaJotc-unsplash.jpg";
import sixthImage from "../../../_assets/images/home/fly-d-mT7lXZPjk7U-unsplash.jpg";
import fourthImage from "../../../_assets/images/home/scott-graham-5fNmWej4tAA-unsplash.jpg";
import secondImage from "../../../_assets/images/home/yiorgos-ntrahas-mcAUHlGirVs-unsplash.jpg";

//https://unsplash.com/@smigielski
//https://unsplash.com/@yiorgosntrahas
//https://unsplash.com/@bloggingguide
//https://unsplash.com/@homajob
//https://unsplash.com/@claybanks
//https://unsplash.com/@flyd2069

const Features = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">
        Empower Your Trading Journey with Cutting-Edge Features
      </h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        <Col>
          <Card>
            <Card.Img variant="top" src={firstImage} />
            <figcaption>
              <i className="photo-credit">
                <a
                  target="_blank"
                  href="https://unsplash.com/@smigielski"
                  rel="noreferrer"
                >
                  Photo By Adam Śmigielski
                </a>
              </i>
            </figcaption>
            <Card.Body>
              <Card.Title>Comprehensive Trade Tracking</Card.Title>
              <Card.Text>
                Log every trade with ease, detailing entry and exit points,
                strategies used, and outcomes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={secondImage} />
            <figcaption>
              <i className="photo-credit">
                <a
                  target="_blank"
                  href="https://unsplash.com/@yiorgosntrahas"
                  rel="noreferrer"
                >
                  Photo By Yiorgos Ntrahas
                </a>
              </i>
            </figcaption>
            <Card.Body>
              <Card.Title>Real-Time Performance Analytics</Card.Title>
              <Card.Text>
                Monitor your trading performance with real-time metrics.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={fifthImage} />
            <figcaption>
              <i className="photo-credit">
                <a
                  target="_blank"
                  href="https://unsplash.com/@bloggingguide"
                  rel="noreferrer"
                >
                  Photo By Blogging Guide
                </a>
              </i>
            </figcaption>
            <Card.Body>
              <Card.Title>Advanced Risk Management</Card.Title>
              <Card.Text>
                Assess and manage your trading risks with advanced tools.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={fourthImage} />
            <figcaption>
              <i className="photo-credit">
                <a
                  target="_blank"
                  href="https://unsplash.com/@homajob"
                  rel="noreferrer"
                >
                  Photo By Scott Graham
                </a>
              </i>
            </figcaption>
            <Card.Body>
              <Card.Title>Educational Resources</Card.Title>
              <Card.Text>
                Access a wealth of learning materials to improve your trading
                knowledge.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={thirdImage} />
            <figcaption>
              <i className="photo-credit">
                <a
                  target="_blank"
                  href="https://unsplash.com/@claybanks"
                  rel="noreferrer"
                >
                  Photo By Clay Banks
                </a>
              </i>
            </figcaption>
            <Card.Body>
              <Card.Title>Community Insights</Card.Title>
              <Card.Text>
                Join a community of traders and share insights and experiences.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={sixthImage} />
            <figcaption>
              <i className="photo-credit">
                <a
                  target="_blank"
                  href="https://unsplash.com/@nampoh"
                  rel="noreferrer"
                >
                  Photo By Maxim Hopman
                </a>
              </i>
            </figcaption>
            <Card.Body>
              <Card.Title>Secure and Private</Card.Title>
              <Card.Text>
                Your data, safely guarded. We prioritize the security and
                privacy of your trading information.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Features;
