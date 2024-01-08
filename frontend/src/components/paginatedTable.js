import {
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const SORT_DIRECTION = {
  ASC: "ASC",
  DESC: "DESC",
};

const styles = {
  columnVisibilityIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    cursor: "pointer",
  },
  tableContainer: {
    position: "relative",
  },
};
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
  sortConfig,
  onColumnSort,
  getCustomColumnIcon,
  customColumnTooltip,
  onCustomColumnClick,
}) => {
  const [columnsOrder, setColumnsOrder] = React.useState(columns);
  const [columnVisibility, setColumnVisibility] = React.useState(
    columns.reduce((acc, column) => {
      acc[column.dataProperty] = true;
      return acc;
    }, {}),
  );
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const toggleColumnVisibility = (column) => {
    setColumnVisibility({
      ...columnVisibility,
      [column]: !columnVisibility[column],
    });
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
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

  const requestSort = (key) => {
    let direction = SORT_DIRECTION.ASC;
    if (
      sortConfig?.key === key &&
      sortConfig?.direction === SORT_DIRECTION.ASC
    ) {
      direction = SORT_DIRECTION.DESC;
    }
    onColumnSort({ key, direction });
  };

  const renderRow = (row) => {
    return columnsOrder.map(({ dataProperty, formatFunction }, index) => {
      if (!columnVisibility[dataProperty]) {
        return null;
      }
      const cellValue = getNestedProperty(dataProperty, row);
      const formattedCellValue =
        formatFunction && cellValue
          ? formatFunction(cellValue)
          : cellValue
            ? cellValue
            : "";
      return <TableCell key={index}>{formattedCellValue}</TableCell>;
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedColumns = Array.from(columnsOrder);
    const [reorderedColumn] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, reorderedColumn);

    setColumnsOrder(reorderedColumns);
  };

  return (
    <>
      {data && data.length > 0 && (
        <Paper>
          <div style={styles.tableContainer}>
            <IconButton
              style={styles.columnVisibilityIcon}
              onClick={handleMenuClick}
            >
              {menuAnchor && <FontAwesomeIcon icon={faChevronDown} size="xs" />}
              {!menuAnchor && (
                <FontAwesomeIcon icon={faChevronLeft} size="xs" />
              )}
            </IconButton>
          </div>
          <TableContainer>
            <Table>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                  {(provided) => (
                    <TableHead
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={
                              selectedRows.length > 0 &&
                              selectedRows.length < data.length
                            }
                            checked={
                              data.length > 0 &&
                              selectedRows.length === data.length
                            }
                            onChange={handleSelectAllClick}
                          />
                        </TableCell>
                        <TableCell className="ps-1 pe-0">
                          <span className="fw-bold">
                            Add/Edit
                            <br /> Journal
                          </span>
                        </TableCell>
                        {columnsOrder.map(
                          ({ header, dataProperty }, index) =>
                            columnVisibility[dataProperty] && (
                              <Draggable
                                key={dataProperty}
                                draggableId={dataProperty}
                                index={index}
                              >
                                {(provided) => (
                                  <TableCell
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className="fw-bold pointer-class"
                                    onClick={() => requestSort(dataProperty)}
                                  >
                                    {header}
                                    {/* Sort Icons */}
                                  </TableCell>
                                )}
                              </Draggable>
                            ),
                        )}
                        {provided.placeholder}
                      </TableRow>
                      <Menu
                        id="long-menu"
                        anchorEl={menuAnchor}
                        keepMounted
                        open={Boolean(menuAnchor)}
                        onClose={handleMenuClose}
                      >
                        {columns.map((column) => (
                          <MenuItem
                            key={column.dataProperty}
                            onClick={() =>
                              toggleColumnVisibility(column.dataProperty)
                            }
                          >
                            <Checkbox
                              checked={columnVisibility[column.dataProperty]}
                            />
                            {column.header}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableHead>
                  )}
                </Droppable>
              </DragDropContext>
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
                      <TableCell>
                        <Tooltip title={customColumnTooltip}>
                          <IconButton onClick={() => onCustomColumnClick(row)}>
                            {getCustomColumnIcon(row)}
                          </IconButton>
                        </Tooltip>
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
  sortConfig: PropTypes.object,
  onColumnSort: PropTypes.func,
  getCustomColumnIcon: PropTypes.func,
  customColumnTooltip: PropTypes.string,
  onCustomColumnClick: PropTypes.func,
};
