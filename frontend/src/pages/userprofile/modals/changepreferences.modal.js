import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { displayError } from "../../../_helpers/errorhelper";
import { exchangesActions } from "../../../_store";
import { userprofileActions } from "../../../_store/userprofile/userprofile.slice";

const ChangePreferencesModal = ({ show, onHide }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gettingExchange, setGettingExchanges] = useState(false);
  const [gettingProfile, setGettingProfile] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [backdropValue, setBackdropValue] = useState("false");
  const [enableKeyboard, setEnableKeyboard] = useState(true);

  const [preferredExchange, setPreferredExchange] = useState("US");
  const [preferredLanguage, setPreferredLanguage] = useState("en-US");

  const dispatch = useDispatch();
  const exchanges = useSelector((x) => x.exchanges.exchanges);
  const exchangesError = useSelector((x) => x.exchanges.error);
  const userProfile = useSelector((x) => x.userprofile.userprofile);
  const userProfileError = useSelector((x) => x.userprofile.error);

  const fetchExchanges = async () => {
    setIsLoading(true);
    setGettingExchanges(true);
    await dispatch(exchangesActions.getExchanges());
  };

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setGettingProfile(true);
    await dispatch(userprofileActions.getUserProfile());
  };

  useEffect(() => {
    //get the exchanges if we don't have them
    if (!exchanges && !gettingExchange) {
      fetchExchanges();
    }

    //get the user profile
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!exchanges) {
      return;
    }
    setGettingExchanges(false);
  }, [exchanges]);

  useEffect(() => {
    if (!userProfile) {
      return;
    }

    if (userProfile) {
      setPreferredExchange(userProfile.preferredExchange || "US");
      setPreferredLanguage(userProfile.preferredLanguage || "en-US");
    }

    setGettingProfile(false);
  }, [userProfile]);

  useEffect(() => {
    if (!gettingProfile && !gettingExchange) {
      setIsLoading(false);
    }
  }, [gettingProfile, gettingExchange]);

  useEffect(() => {}, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setBackdropValue("static");
    setEnableKeyboard(false);

    await dispatch(
      userprofileActions.editUserProfile({
        preferredExchange,
        preferredLanguage,
      }),
    );

    if (userProfileError) {
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    setIsSaved(true);
    setBackdropValue("false");
    setEnableKeyboard(true);
    setTimeout(() => onHide(), 2000);
  };

  const cancelModal = () => {
    if (!isSaving && !isSaved) {
      onHide();
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      keyboard={enableKeyboard}
      backdrop={backdropValue}
    >
      <Modal.Header>
        <Modal.Title>Change Preferences</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        {isSaved && (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
            <p>Preferences Saved Successfully!</p>
          </div>
        )}
        {!isLoading && !isSaving && !isSaved && (
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

            {userProfileError && (
              <Alert variant="danger" className="my-3" dismissible>
                {displayError(userProfileError)}
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

            <Button
              className="mt-4 ms-4"
              variant="danger"
              type="button"
              onClick={cancelModal}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

ChangePreferencesModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default ChangePreferencesModal;
