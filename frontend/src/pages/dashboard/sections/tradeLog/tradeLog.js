import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import { displayError } from "../../../../_helpers/errorhelper";
import { tradesActions } from "../../../../_store";
import { PaginatedTable } from "../../../../components/paginatedTable";
import { AddJournalEntry } from "./addJournalEntry";
import { AddTradeModal } from "./addTrade.modal";
import { DeleteTradeModal } from "./deleteTrade.modal";
import { EditDeleteJournalEntry } from "./editDeleteJournalEntry";
import { EditTradeModal } from "./editTrade.modal";

export const TradeLog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAddTradeModal, setShowAddTradeModal] = useState(false);
  const [showDeleteTradeModal, setShowDeleteTradeModal] = useState(false);
  const [showAddJournalEntryModal, setShowAddJournalEntryModal] =
    useState(false);
  const [showEditJournalEntryModal, setShowEditJournalEntryModal] =
    useState(false);
  const [currentTradeForJournal, setCurrentTradeForJournal] = useState("");
  const [existingTrade, setExistingTrade] = useState(null);
  const [showEditTradeModal, setShowEditTradeModal] = useState(false);

  const [hasOption, setHasOption] = useState(false);
  const plusIcon = <FontAwesomeIcon icon={faCirclePlus} size="1x" />;

  const addJournalIcon = <FontAwesomeIcon icon={faComment} size="1x" />;
  const editJournalIcon = <FontAwesomeIcon icon={faPenToSquare} size="1x" />;

  const [selectedRows, setSelectedRows] = useState([]);

  const dispatch = useDispatch();

  const trades = useSelector((x) => x.trades.trades);
  const tradesError = useSelector((x) => x.trades.error);
  const totalTrades = useSelector((x) => x.trades.totalItems);
  const page = useSelector((x) => x.trades.page);
  const limit = useSelector((x) => x.trades.limit);
  const sortConfig = useSelector((x) => x.trades.sortConfig);
  const columnsOrder = useSelector((x) => x.trades.columnsOrder);
  const columnVisibility = useSelector((x) => x.trades.columnVisibility);

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const fetchTrades = async () => {
    setIsLoading(true);
    const tradeObj = {
      page,
      limit,
    };
    if (sortConfig && sortConfig.key && sortConfig.direction) {
      tradeObj.sortColumn = sortConfig.key;
      tradeObj.sortDirection = sortConfig.direction;
    }

    await dispatch(tradesActions.getTrades(tradeObj));
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

  const handleColumnSort = async (sortConfig) => {
    const paginatedTableConfig = {
      tableName: "tradeLog",
      sortColumns: sortConfig,
    };
    await dispatch(tradesActions.setSortConfig(paginatedTableConfig));
  };

  const handleColumnsOrder = async (reOrderedColumns) => {
    const paginatedTableConfig = {
      tableName: "tradeLog",
      columnsOrder: reOrderedColumns,
    };
    await dispatch(tradesActions.setColumnsOrder(paginatedTableConfig));
  };

  const handleColumnVisibility = async (column) => {
    const visibleColumns = {
      ...columnVisibility,
      [column]: !columnVisibility[column],
    };
    const paginatedTableConfig = {
      tableName: "tradeLog",
      columnVisibility: visibleColumns,
    };
    await dispatch(tradesActions.setColumnVisibility(paginatedTableConfig));
  };

  const columns = () => {
    return [
      { header: "Created", dataProperty: "createdAt" },
      { header: "Broker", dataProperty: "broker.brokerName" },
      { header: "Symbol", dataProperty: "ticker" },
      { header: "CALL/PUT", dataProperty: "stockoption.optionType" },
      {
        header: "Strike Price",
        dataProperty: "stockoption.strikePrice",
        formatFunction: dollarFormatFunction,
      },
      {
        header: "Buy Price",
        dataProperty: "buyPrice",
        formatFunction: dollarFormatFunction,
      },
      {
        header: "Sell Price",
        dataProperty: "sellPrice",
        formatFunction: dollarFormatFunction,
      },
      { header: "Buy Date", dataProperty: "buyDate" },
      { header: "Sell Date", dataProperty: "sellDate" },
      { header: "Quantity", dataProperty: "quantity" },
      {
        header: "Profit/Loss",
        dataProperty: "tradeTotal",
        formatFunction: dollarFormatFunction,
      },
    ];
  };

  const dollarFormatFunction = (data) => {
    return USDollar.format(data);
  };

  useEffect(() => {
    if (columnsOrder && columnVisibility) {
      fetchTrades();
    }
  }, [page, limit, sortConfig]);

  useEffect(() => {
    if (!columnsOrder || !columnVisibility) {
      const defaultColumnVisibility = columns().reduce((acc, column) => {
        acc[column.dataProperty] = true;
        return acc;
      }, {});

      const defaultColumnsOrder = columns();

      dispatch(
        tradesActions.getTableConfig({
          tableName: "tradeLog",
          columnsOrder: defaultColumnsOrder,
          columnVisibility: defaultColumnVisibility,
        }),
      );
      return;
    }
  }, [columnVisibility, columnsOrder]);

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

  const getCustomColumnIcon = (row) => {
    // Determine which icon to return based on a property of the row
    if (row.journalId) {
      return editJournalIcon;
    }
    return addJournalIcon;
  };

  const handleCustomColumnClick = (row) => {
    setCurrentTradeForJournal(row);
    if (row?.journalId) {
      setShowEditJournalEntryModal(true);
      return;
    }
    setShowAddJournalEntryModal(true);
  };

  const hideDeleteModal = (clearSelected) => {
    if (clearSelected) {
      setSelectedRows([]);
    }
    setShowDeleteTradeModal(false);
  };

  const hideAddJournalEntryModal = () => {
    setCurrentTradeForJournal("");
    setShowAddJournalEntryModal(false);
  };

  const hideEditJournalEntryModal = () => {
    setCurrentTradeForJournal("");
    setShowEditJournalEntryModal(false);
  };

  const showEditTrade = () => {
    //get the first item from the list
    setExistingTrade(selectedRows[0]);
    setShowEditTradeModal(true);
  };

  const hideEditTrade = (clearSelected) => {
    if (clearSelected) {
      setSelectedRows([]);
    }
    //get the first item from the list
    setExistingTrade(null);
    setShowEditTradeModal(false);
  };

  return (
    <>
      {isLoading && !trades && <Spinner animation="border" />}
      {!isLoading && (
        <>
          {tradesError && (
            <Alert variant="danger" className="my-3" dismissible>
              {displayError(tradesError)}
            </Alert>
          )}
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
              <>
                <Col md={{ span: 2, offset: 4 }} className="text-end">
                  <Button
                    onClick={showEditTrade}
                    disabled={!(selectedRows.length === 1)}
                  >
                    Edit
                  </Button>
                </Col>
                <Col md={{ span: 2 }} className="text-end">
                  <Button
                    onClick={showDeleteModal}
                    disabled={selectedRows.length === 0}
                  >
                    Delete
                  </Button>
                </Col>
              </>
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
              sortConfig={sortConfig}
              onColumnSort={handleColumnSort}
              getCustomColumnIcon={getCustomColumnIcon}
              customColumnTooltip={"Add/Edit Journal"}
              onCustomColumnClick={handleCustomColumnClick}
              columnsOrder={columnsOrder}
              onChangeColumnsOrder={handleColumnsOrder}
              columnVisibility={columnVisibility}
              onChangeColumnVisibility={handleColumnVisibility}
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
          {showAddJournalEntryModal && (
            <AddJournalEntry
              trade={currentTradeForJournal}
              onHide={hideAddJournalEntryModal}
              show={showAddJournalEntryModal}
            />
          )}
          {showEditJournalEntryModal && (
            <EditDeleteJournalEntry
              trade={currentTradeForJournal}
              onHide={hideEditJournalEntryModal}
              show={showEditJournalEntryModal}
            />
          )}
          {showEditTradeModal && (
            <EditTradeModal
              trade={currentTradeForJournal}
              onHide={hideEditTrade}
              existingTrade={existingTrade}
              show={showEditTradeModal}
            />
          )}
        </>
      )}
    </>
  );
};
