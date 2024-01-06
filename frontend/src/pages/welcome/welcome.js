import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { displayError } from "../../_helpers/errorhelper";
import { history } from "../../_helpers/history";
import { exchangesActions, userprofileActions } from "../../_store";
import { APP_URL_PATHS } from "../../shared/sharedConstants";

export const Welcome = () => {
  const dispatch = useDispatch();
  const user = useSelector((x) => x.user.user);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [preferredExchange, setPreferredExchange] = useState("US");
  const [preferredLanguage, setPreferredLanguage] = useState("en-US");

  const exchanges = useSelector((x) => x.exchanges.exchanges);
  const exchangesError = useSelector((x) => x.exchanges.error);
  const userProfileError = useSelector((x) => x.userprofile.error);
  const fetchExchanges = async () => {
    setIsLoading(true);
    await dispatch(exchangesActions.getExchanges());
  };

  useEffect(() => {
    if (user.hasUserProfile) {
      history.navigate(APP_URL_PATHS.DASHBOARD);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    await dispatch(
      userprofileActions.createUserProfile({
        preferredExchange,
        preferredLanguage,
      }),
    );

    if (userProfileError) {
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    history.navigate(APP_URL_PATHS.DASHBOARD);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h4>Please select your preferred exchange and preferred language</h4>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading preferences...</p>
            </div>
          )}
          {isSaving && (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Saving preferences...</p>
            </div>
          )}
          {!isLoading && !isSaving && (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Preferred Stock Exchange</Form.Label>
                <Form.Control
                  as="select"
                  value={preferredExchange}
                  onChange={(e) => setPreferredExchange(e.target.value)}
                >
                  {exchanges &&
                    exchanges.length > 0 &&
                    exchanges.map((singleExchange, idx) => (
                      <option
                        key={`${idx}-${singleExchange?.code}`}
                        value={singleExchange?.code}
                      >
                        {`${singleExchange?.name}/${singleExchange?.country}`}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Preferred Language</Form.Label>
                <Form.Control
                  as="select"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                >
                  <option value="en-US">US English</option>
                </Form.Control>
              </Form.Group>
              {exchangesError && (
                <Alert variant="danger" className="my-3" dismissible>
                  {displayError(exchangesError)}
                </Alert>
              )}
              <Button
                disabled={isSaving}
                className="mt-4"
                variant="primary"
                type="submit"
              >
                Save Preferences
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};
