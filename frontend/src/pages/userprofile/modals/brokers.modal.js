import {
  faArrowsRotate,
  faCirclePlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { brokersActions } from "../../../_store";
import AddBrokerModal from "./addBroker.modal";
import DeleteBrokerModal from "./deleteBroker.modal";

const BrokersModal = ({ show, onHide }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gettingBrokers, setGettingBrokers] = useState(false);

  const [showAddBrokerModal, setShowAddBrokerModal] = useState(false);
  const [showDeleteBrokerModal, setShowDeleteBrokerModal] = useState(false);
  const [currentDeleteBroker, setCurrentDeleteBroker] = useState(null);

  const [showParent, setShowParent] = useState(true);

  const dispatch = useDispatch();
  const brokers = useSelector((x) => x.brokers.brokers);

  const trashIcon = <FontAwesomeIcon icon={faTrashCan} size="1x" />;
  const plusIcon = <FontAwesomeIcon icon={faCirclePlus} size="1x" />;
  const refreshIcon = <FontAwesomeIcon icon={faArrowsRotate} size="1x" />;

  const refreshBrokers = async () => {
    if (!gettingBrokers) {
      await fetchBrokers();
    }
  };
  const fetchBrokers = async () => {
    setIsLoading(true);
    setGettingBrokers(true);
    await dispatch(brokersActions.getAllBroker());
  };

  useEffect(() => {
    if (!brokers && !gettingBrokers) {
      fetchBrokers();
    }
  }, []);

  useEffect(() => {
    if (!brokers) {
      return;
    }
    setGettingBrokers(false);
    setIsLoading(false);
  }, [brokers]);

  const cancelModal = () => {
    onHide();
  };

  const showAddBrokerChildModal = () => {
    setShowAddBrokerModal(true);
    setShowParent(false);
  };

  const hideAddBrokerChildModal = () => {
    setShowAddBrokerModal(false);
    setShowParent(true);
  };

  const setupAndShowDeleteBrokeModal = (brokerObj) => {
    setCurrentDeleteBroker(brokerObj);
    setShowDeleteBrokerModal(true);
  };

  const hideAndCleanupDeleteBrokerModal = () => {
    setCurrentDeleteBroker(null);
    setShowDeleteBrokerModal(false);
  };

  return (
    <>
      {showParent && (
        <Modal size="lg" show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Brokers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isLoading && (
              <div className="text-center">
                <Spinner animation="border" />
                <p>Loading brokers...</p>
              </div>
            )}
            {!isLoading && (
              <>
                <Row className="mb-3">
                  <Col>
                    <Button
                      onClick={() => showAddBrokerChildModal(true)}
                      variant="info"
                    >
                      {plusIcon} Add Broker
                    </Button>
                    <Button
                      variant="info"
                      onClick={refreshBrokers}
                      className="ms-2"
                    >
                      {refreshIcon}
                    </Button>
                  </Col>
                </Row>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Broker Name</TableCell>
                          <TableCell>Broker Option Fee</TableCell>
                          <TableCell>Broker Stock Fee</TableCell>
                          <TableCell className="text-center">Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {brokers &&
                          brokers.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.brokerName}</TableCell>
                              <TableCell>{row.brokerOptionFee}</TableCell>
                              <TableCell>{row.brokerStockFee}</TableCell>
                              <TableCell
                                className="text-center pointer-class"
                                onClick={() =>
                                  setupAndShowDeleteBrokeModal(row)
                                }
                              >
                                {trashIcon}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-4 ms-4"
              variant="danger"
              type="button"
              onClick={cancelModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showAddBrokerModal && (
        <AddBrokerModal
          show={showAddBrokerModal}
          onHideParent={() => hideAddBrokerChildModal()}
        />
      )}
      {showDeleteBrokerModal && (
        <DeleteBrokerModal
          show={showDeleteBrokerModal}
          onHideParent={() => hideAndCleanupDeleteBrokerModal()}
          broker={currentDeleteBroker}
        />
      )}
    </>
  );
};

BrokersModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default BrokersModal;
