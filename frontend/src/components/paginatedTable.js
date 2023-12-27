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

export const PaginatedTable = ({ data, onPageChange, onRowsPerPageChange }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* Replace with your table headers */}
              <TableCell>Column 1</TableCell>
              <TableCell>Column 2</TableCell>
              <TableCell>Column 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {/* Replace with your row rendering logic */}
                <TableCell>{row.column1}</TableCell>
                <TableCell>{row.column2}</TableCell>
                <TableCell>{row.column3}</TableCell>
              </TableRow>
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
  data: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
};
