import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { PaginatedTable } from "../../../../components/paginatedTable";
import { AddTradeModal } from "./addTrade.modal";

export const TradeLog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAddTradeModal, setShowAddTradeModal] = useState(false);
  const [hasOption, setHasOption] = useState(false);
  const plusIcon = <FontAwesomeIcon icon={faCirclePlus} size="1x" />;

  const handlePageChange = (page) => {
    console.log(`Page changed to: ${page + 1}`);
  };

  const handleRowsPerPageChange = (rowsPerPage) => {
    console.log(`Rows per page changed to: ${rowsPerPage}`);
  };

  const showTradeWithOption = () => {
    setHasOption(true);
    setShowAddTradeModal(true);
  };

  const hideTradeWithOption = () => {
    if (hasOption) {
      setHasOption(false);
    }
    setShowAddTradeModal(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? (
    <Spinner animation="border" />
  ) : (
    <>
      <Row>
        <Col>
          <Button onClick={() => setShowAddTradeModal(true)}>
            {plusIcon} Add Trade
          </Button>
          <Button
            variant="success"
            className="ms-2"
            onClick={() => showTradeWithOption()}
          >
            {plusIcon} Add Option Trade
          </Button>
        </Col>
      </Row>
      <PaginatedTable
        data={[]}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      {showAddTradeModal && (
        <AddTradeModal
          show={showAddTradeModal}
          onHide={() => hideTradeWithOption()}
          isOption={hasOption}
        />
      )}
    </>
  );
};
