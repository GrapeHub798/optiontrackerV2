import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import { tradesActions } from "../../../../_store";
import { PaginatedTable } from "../../../../components/paginatedTable";
import { AddTradeModal } from "./addTrade.modal";
import { DeleteTradeModal } from "./deleteTrade.modal";

export const TradeLog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAddTradeModal, setShowAddTradeModal] = useState(false);
  const [showDeleteTradeModal, setShowDeleteTradeModal] = useState(false);
  const [hasOption, setHasOption] = useState(false);
  const plusIcon = <FontAwesomeIcon icon={faCirclePlus} size="1x" />;

  const [selectedRows, setSelectedRows] = useState([]);

  const dispatch = useDispatch();

  const trades = useSelector((x) => x.trades.trades);
  const totalTrades = useSelector((x) => x.trades.totalItems);
  const page = useSelector((x) => x.trades.page);
  const limit = useSelector((x) => x.trades.limit);

  const fetchTrades = async () => {
    setIsLoading(true);
    await dispatch(tradesActions.getTrades({ limit, page }));
    setIsLoading(false);
  };

  const handlePageChange = async (newPage) => {
    await dispatch(tradesActions.setPage(newPage));
  };

  const handleRowsPerPageChange = async (limit) => {
    await dispatch(tradesActions.setLimit(limit));
  };
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRows(selectedRows);
  };

  const columns = () => {
    return [
      { header: "Created", dataProperty: "createdAt" },
      { header: "Broker", dataProperty: "broker.brokerName" },
      { header: "Symbol", dataProperty: "ticker" },
      { header: "CALL/PUT", dataProperty: "option.optionType" },
      { header: "Strike Price", dataProperty: "option.strikePrice" },
      { header: "Buy Price", dataProperty: "buyPrice" },
      { header: "Sell Price", dataProperty: "sellPrice" },
      { header: "Buy Date", dataProperty: "buyDate" },
      { header: "Sell Date", dataProperty: "sellDate" },
      { header: "Quantity", dataProperty: "quantity" },
      { header: "Profit/Loss", dataProperty: "tradeTotal" },
    ];
  };

  useEffect(() => {
    fetchTrades();
  }, [page, limit]);

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

  const showDeleteModal = () => {
    if (!selectedRows || selectedRows.length === 0) {
      return;
    }
    setShowDeleteTradeModal(true);
  };

  const hideDeleteModal = (clearSelected) => {
    if (clearSelected) {
      setSelectedRows([]);
    }
    setShowDeleteTradeModal(false);
  };

  return (
    <>
      {isLoading && !trades && <Spinner animation="border" />}
      {!isLoading && trades && (
        <>
          <Row className="mb-2">
            <Col md={{ span: 4 }}>
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
            {trades && trades.length > 0 && (
              <Col md={{ span: 4, offset: 4 }} className="text-end">
                <Button
                  onClick={showDeleteModal}
                  disabled={selectedRows.length === 0}
                >
                  Delete
                </Button>
              </Col>
            )}
          </Row>
          {trades && trades.length === 0 && (
            <>
              <hr />
              <Row>
                <Col className="text-center">
                  No Trade Available, please add some.
                </Col>
              </Row>
            </>
          )}
          {trades && trades.length > 0 && (
            <PaginatedTable
              page={page}
              limit={limit}
              totalRows={totalTrades}
              data={trades}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              columns={columns()}
              selectedRows={selectedRows}
              onRowSelectionChange={handleRowSelectionChange}
            />
          )}
          {showAddTradeModal && (
            <AddTradeModal
              show={showAddTradeModal}
              onHide={hideTradeWithOption}
              isOption={hasOption}
            />
          )}
          {showDeleteTradeModal && (
            <DeleteTradeModal
              show={showDeleteTradeModal}
              onHide={hideDeleteModal}
              listOfTrades={selectedRows}
            />
          )}
        </>
      )}
    </>
  );
};
