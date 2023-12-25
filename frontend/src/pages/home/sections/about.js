import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import stockMarketImage from "../../../_assets/images/home/maxim-hopman-fiXLQXAhCfk-unsplash.jpg";

const About = () => {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <Image
            alt="stock market chart with candles and line graph"
            src={stockMarketImage}
            fluid
          />
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
        </Col>
        <Col md={6}>
          <h2>About OS Trade Journal</h2>
          <p>
            The OS Trade Journal is an open-source application designed to
            empower traders and investors by enabling efficient tracking and
            analysis of their trading activities. Understanding that keeping a
            trade journal is a crucial aspect of a successful trading strategy,
            our application facilitates the recording of trades, reflections,
            and decisions.
          </p>
          <p>
            By meticulously logging your trades, analyzing the outcomes, and
            learning from both successes and failures, OS Trade Journal helps in
            honing your trading skills. It&apos;s not just about the profits or
            losses, but about understanding the &apos;why&apos; and
            &apos;how&apos; of your trading decisions. This self-awareness is a
            stepping stone to becoming a more skilled and informed trader.
          </p>
          <p>
            Whether you&apos;re a seasoned trader or just starting out, the OS
            Trade Journal is your companion in the journey towards financial
            proficiency and trading mastery.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
