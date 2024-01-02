import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { SearchComponent } from "../../../../../components/searchComponent";

export const StockSearchForm = ({ selection, setSelection }) => {
  const [selectedStock, setSelectedStock] = useState("");
  const stocks = useSelector((x) => x.stocks.stocks);
  const stockFields = ["stockName", "ticker"];
  const searchPlaceholderText = "Search for stock...";

  const handleSelectionChange = (item) => {
    setSelection(item);
  };

  useEffect(() => {
    setSelectedStock(selection);
  }, [selection]);

  return (
    <Container>
      <Row>
        <Col>
          <SearchComponent
            data={stocks}
            onSelectionChange={handleSelectionChange}
            currentSelection={selectedStock}
            searchableFields={stockFields}
            placeHolderText={searchPlaceholderText}
          />
        </Col>
      </Row>
      {selectedStock && (
        <>
          <Row className="my-2">
            <Col md={6} className="ms-2">
              <Row>
                <Col className="d-flex align-items-center">
                  <h5>Selected Stock</h5>
                </Col>
              </Row>
              <div>
                <span className="left d-inline-block text-end fw-bold">
                  Stock Name:
                </span>
                <span className="right d-inline-block ms-2">
                  {selectedStock?.original?.stockName}
                </span>
              </div>
              <div>
                <span className="left d-inline-block text-end fw-bold">
                  Ticker:
                </span>
                <span className="right d-inline-block ms-2">
                  {selectedStock?.original?.ticker}
                </span>
              </div>
              <div>
                <span className="left d-inline-block text-end fw-bold">
                  Exchange:
                </span>
                <span className="right d-inline-block ms-2">
                  {selectedStock?.original?.exchange}
                </span>
              </div>
              <div>
                <span className="left d-inline-block text-end fw-bold">
                  Stock Type:
                </span>
                <span className="right d-inline-block ms-2">
                  {selectedStock?.original?.stockType}
                </span>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

StockSearchForm.propTypes = {
  selection: PropTypes.any,
  setSelection: PropTypes.func,
};
