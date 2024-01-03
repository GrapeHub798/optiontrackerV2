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
  initialPage,
  initialRowCount,
  onPageChange,
  onRowsPerPageChange,
  columns,
  onRowSelectionChange,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  const handleSelectAllClick = (event) => {
    let newSelected = [];

    if (event.target.checked) {
      // Select all rows on the current page
      newSelected = data;
    }

    setSelectedRows(newSelected);
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

    setSelectedRows(newSelected);
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

  useEffect(() => {
    if (!initialPage || !initialRowCount) {
      return;
    }
    setPage(initialPage);
    setRowsPerPage(initialRowCount);
  }, [initialPage, initialRowCount]);

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
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
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
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onRowSelectionChange: PropTypes.func,
};
