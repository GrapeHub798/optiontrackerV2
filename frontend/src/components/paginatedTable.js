import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

export const PaginatedTable = ({
  data,
  onPageChange,
  onRowsPerPageChange,
  columns,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  const getNestedProperty = (path, obj) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const renderRow = (row) => {
    return columns.map(({ dataProperty }, index) => {
      const cellValue = getNestedProperty(dataProperty, row);
      return (
        <TableCell key={index}>
          {cellValue !== undefined ? cellValue : ""}
        </TableCell>
      );
    });
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ header }, index) => (
                <TableCell className="fw-bold" key={index}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>{renderRow(row)}</TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 30, 50]}
      />
    </Paper>
  );
};

PaginatedTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
};
