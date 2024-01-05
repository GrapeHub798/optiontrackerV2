import {
  Checkbox,
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
import React, { useEffect, useState } from "react";

export const PaginatedTable = ({
  data,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  columns,
  onRowSelectionChange,
  page,
  limit,
  selectedRows,
}) => {
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onPageChange(0);
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  const handleSelectAllClick = (event) => {
    let newSelected = [];

    if (event.target.checked) {
      // Select all rows on the current page
      newSelected = data;
    }

    onRowSelectionChange(newSelected);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }

    onRowSelectionChange(newSelected);
  };
  const isSelected = (row) => selectedRows.indexOf(row) !== -1;

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
    <>
      {data && data.length > 0 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedRows.length > 0 &&
                        selectedRows.length < data.length
                      }
                      checked={
                        data.length > 0 && selectedRows.length === data.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  {columns.map(({ header }, index) => (
                    <TableCell className="fw-bold" key={index}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => {
                  const isItemSelected = isSelected(row);
                  return (
                    <TableRow key={index} selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, row)}
                        />
                      </TableCell>
                      {renderRow(row)}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 30, 50]}
          />
        </Paper>
      )}
    </>
  );
};

PaginatedTable.propTypes = {
  initialPage: PropTypes.number,
  initialRowCount: PropTypes.number,
  columns: PropTypes.array,
  data: PropTypes.array,
  page: PropTypes.number,
  limit: PropTypes.number,
  totalRows: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onRowSelectionChange: PropTypes.func,
  selectedRows: PropTypes.array,
};
