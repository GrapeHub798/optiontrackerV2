import "./userprofile.css";

import {
  faBuildingColumns,
  faLanguage,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import BrokersModal from "./modals/brokers.modal";
import ChangePasswordModal from "./modals/changepassword.modal";
import ChangePreferencesModal from "./modals/changepreferences.modal";

export const UserProfile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showBrokersModal, setShowBrokersModal] = useState(false);

  const lockIcon = <FontAwesomeIcon icon={faLock} size={"6x"} />;
  const languageIcon = <FontAwesomeIcon icon={faLanguage} size={"6x"} />;
  const buildingIcon = <FontAwesomeIcon icon={faBuildingColumns} size={"6x"} />;

  return (
    <Container>
      <h1>User Profile</h1>
      <Row>
        <Col md={{ span: 4 }} className="mt-4 d-flex justify-content-center">
          <Card
            className="pointer-class profile-cards"
            onClick={() => setShowPasswordModal(true)}
          >
            <Card.Header className="text-center">{lockIcon}</Card.Header>
            <Card.Body>
              <Card.Title className="text-center">Change Password</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 4 }} className="mt-4 d-flex justify-content-center">
          <Card
            className="pointer-class profile-cards"
            onClick={() => setShowPreferencesModal(true)}
          >
            <Card.Header className="text-center">{languageIcon}</Card.Header>
            <Card.Body>
              <Card.Title className="text-center">
                Change Exchange/Language
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 4 }} className="mt-4 d-flex justify-content-center">
          <Card
            className="pointer-class profile-cards"
            onClick={() => setShowBrokersModal(true)}
          >
            <Card.Header className="text-center">{buildingIcon}</Card.Header>
            <Card.Body>
              <Card.Title className="text-center">Brokers</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showPasswordModal && (
        <ChangePasswordModal
          show={showPasswordModal}
          onHide={() => setShowPasswordModal(false)}
        />
      )}
      {showBrokersModal && (
        <BrokersModal
          show={showBrokersModal}
          onHide={() => setShowBrokersModal(false)}
        />
      )}
      {showPreferencesModal && (
        <ChangePreferencesModal
          show={showPreferencesModal}
          onHide={() => setShowPreferencesModal(false)}
        />
      )}
    </Container>
  );
};
