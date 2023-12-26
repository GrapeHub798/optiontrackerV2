import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { PaginatedTable } from "../../../components/paginatedTable";

export const TradeLog = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (page) => {
    console.log(`Page changed to: ${page + 1}`);
  };

  const handleRowsPerPageChange = (rowsPerPage) => {
    console.log(`Rows per page changed to: ${rowsPerPage}`);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return isLoading ? (
    <Spinner animation="border" />
  ) : (
    <PaginatedTable
      data={[]}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};
