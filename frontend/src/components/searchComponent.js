import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { Form, ListGroup, Spinner } from "react-bootstrap";

import { searchArray } from "../_helpers/searchArray";
import { formatStocks } from "../pages/dashboard/sections/tradeLog/formatStocks";

export const SearchComponent = ({
  data,
  onSelectionChange,
  currentSelection,
  searchableFields,
  placeHolderText,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(
    debounce((term) => {
      if (!term) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      const matches = formatStocks(
        searchArray(data, term, searchableFields, 10),
      );

      setResults(matches);
      setIsLoading(false);
    }, 300),
    [data],
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    search(e.target.value);
  };

  const handleSelect = (item) => {
    onSelectionChange(item);
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder={placeHolderText || "Search..."}
        value={searchTerm}
        onChange={handleChange}
      />
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <ListGroup>
          {results.map((item) => (
            <ListGroup.Item
              key={item.value}
              action
              onClick={() => handleSelect(item)}
              active={currentSelection && item.value === currentSelection.value}
            >
              {item.label}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

SearchComponent.propTypes = {
  data: PropTypes.array,
  onSelectionChange: PropTypes.func,
  currentSelection: PropTypes.any,
  searchableFields: PropTypes.array,
  placeHolderText: PropTypes.string,
};
