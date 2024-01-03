import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import { tradesActions } from "../../../../_store";
import { PaginatedTable } from "../../../../components/paginatedTable";
import { AddTradeModal } from "./addTrade.modal";

export const TradeLog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAddTradeModal, setShowAddTradeModal] = useState(false);
  const [hasOption, setHasOption] = useState(false);
  const plusIcon = <FontAwesomeIcon icon={faCirclePlus} size="1x" />;

  const dispatch = useDispatch();
  const trades = useSelector((x) => x.trades.trades);
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

  const columns = () => {
    return [
      { header: "Broker", dataProperty: "broker.brokerName" },
      { header: "Symbol", dataProperty: "ticker" },
      { header: "CALL/PUT", dataProperty: "option.optionType" },
      { header: "Strike Price", dataProperty: "option.strikePrice" },
      { header: "Buy Price", dataProperty: "buyPrice" },
      { header: "Sell Price", dataProperty: "sellPrice" },
      { header: "Quantity", dataProperty: "quantity" },
      { header: "Profit/Loss", dataProperty: "tradeTotal" },
    ];
  };

  useEffect(() => {
    if (!trades) {
      fetchTrades();
    }
    setIsLoading(false);
  }, [trades]);

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

  return (
    <>
      {isLoading && !trades && <Spinner animation="border" />}
      {!isLoading && trades && (
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
              data={trades}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              columns={columns()}
            />
          )}
          {showAddTradeModal && (
            <AddTradeModal
              show={showAddTradeModal}
              onHide={() => hideTradeWithOption()}
              isOption={hasOption}
            />
          )}
        </>
      )}
    </>
  );
};
