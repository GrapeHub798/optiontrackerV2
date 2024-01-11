import { createSlice } from "@reduxjs/toolkit";

import { defaultFulfilledReducer } from "../defaultStoreReducers";
import {
  createNewTradeAction,
  deleteMultipleTradesAction,
  editTradeAction,
  getTableConfigAction,
  getTradesAction,
  setColumnsOrderAction,
  setColumnVisibilityAction,
  setSortConfigAction,
} from "./trades.actions";

export const TRADELOGSORT_LS_KEY = "trade_log_sort";
export const TRADELOGCOLUMNORDER_LS_KEY = "trade_log_column_order";
export const TRADELOGCOLUMNVISIBILITY_LS_KEY = "trade_log_column_visibility";

const name = "trades";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });

export const tradesActions = { ...slice.actions, ...extraActions };
export const tradesReducer = slice.reducer;

function createInitialState() {
  let defaultSortOrder = null;
  let defaultColumnsOrder = "";
  let defaultColumnVisibility = "";

  try {
    const localStorageSortOrder = localStorage.getItem(TRADELOGSORT_LS_KEY);
    defaultSortOrder = JSON.parse(localStorageSortOrder);

    const localStorageColumnsOrder = localStorage.getItem(
      TRADELOGCOLUMNORDER_LS_KEY,
    );
    defaultColumnsOrder = JSON.parse(localStorageColumnsOrder);

    const localStorageColumnVisibility = localStorage.getItem(
      TRADELOGCOLUMNVISIBILITY_LS_KEY,
    );

    defaultColumnVisibility = JSON.parse(localStorageColumnVisibility);
  } catch (e) {
    console.log(e);
  }

  return {
    trades: "",
    sortConfig: defaultSortOrder,
    columnsOrder: defaultColumnsOrder,
    columnVisibility: defaultColumnVisibility,
    page: 0,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
    loading: false,
    error: null,
  };
}

function createReducers() {
  return {
    setPage,
    setLimit,
  };

  function setPage(state, action) {
    state.page = action.payload;
  }

  function setLimit(state, action) {
    state.limit = action.payload;
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/trade`;
  const paginatedTableConfigUrl = `${process.env.REACT_APP_API_URL}/paginatedTableConfig`;

  return {
    setSortConfig: setSortConfigAction(paginatedTableConfigUrl),
    setColumnsOrder: setColumnsOrderAction(paginatedTableConfigUrl),
    setColumnVisibility: setColumnVisibilityAction(paginatedTableConfigUrl),
    getTableConfig: getTableConfigAction(paginatedTableConfigUrl),
    getTrades: getTradesAction(baseUrl),
    createNewTrade: createNewTradeAction(baseUrl),
    editTrade: editTradeAction(baseUrl),
    deleteMultipleTrades: deleteMultipleTradesAction(baseUrl),
  };
}

function defaultPending(state) {
  state.loading = true;
  state.error = null;
}

function defaultRejected(state, action) {
  state.loading = false;
  state.error = action.payload || "Failed to fetch data";
}

function createExtraReducers() {
  return (builder) => {
    getTradesReducer();
    createNewTradeReducer();
    editTradeReducer();
    deleteMultipleTradesReducer();
    setSortConfigReducer();
    setColumnsOrderReducer();
    setColumnVisibilityReducer();
    getTableConfigReducer();

    function getTableConfigReducer() {
      const { pending, fulfilled, rejected } = extraActions.getTableConfig;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          const sortColumns = action.payload?.sortColumns || null;
          if (sortColumns) {
            localStorage.setItem(
              TRADELOGSORT_LS_KEY,
              action.payload?.sortColumns,
            );
          }

          const columnVisibility =
            JSON.parse(action.payload?.columnVisibility) ||
            action.payload.defaultTableConfig.columnVisibility;

          localStorage.setItem(
            TRADELOGCOLUMNVISIBILITY_LS_KEY,
            JSON.stringify(columnVisibility),
          );

          const columnsOrder =
            JSON.parse(action.payload?.columnsOrder) ||
            action.payload.defaultTableConfig.columnsOrder;
          localStorage.setItem(
            TRADELOGCOLUMNORDER_LS_KEY,
            JSON.stringify(columnsOrder),
          );

          state.columnVisibility = columnVisibility;
          state.columnsOrder = columnsOrder;
          state.sortConfig = sortColumns;
          state.loading = false;
          state.error = null;
        })
        .addCase(rejected, defaultRejected);
    }

    function setColumnVisibilityReducer() {
      const { pending, fulfilled, rejected } = extraActions.setColumnVisibility;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          localStorage.setItem(
            TRADELOGCOLUMNVISIBILITY_LS_KEY,
            JSON.stringify(
              action.payload?.paginatedTableConfig?.columnVisibility,
            ),
          );
          state.columnVisibility =
            action.payload?.paginatedTableConfig?.columnVisibility;
          state.loading = false;
          state.error = null;
        })
        .addCase(rejected, defaultRejected);
    }

    function setColumnsOrderReducer() {
      const { pending, fulfilled, rejected } = extraActions.setColumnsOrder;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          localStorage.setItem(
            TRADELOGCOLUMNORDER_LS_KEY,
            JSON.stringify(action.payload?.paginatedTableConfig?.columnsOrder),
          );
          state.columnsOrder =
            action.payload?.paginatedTableConfig?.columnsOrder;
          state.loading = false;
          state.error = null;
        })
        .addCase(rejected, defaultRejected);
    }
    function setSortConfigReducer() {
      const { pending, fulfilled, rejected } = extraActions.setSortConfig;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          localStorage.setItem(
            TRADELOGSORT_LS_KEY,
            JSON.stringify(action.payload?.paginatedTableConfig?.sortColumns),
          );
          state.sortConfig = action.payload?.paginatedTableConfig?.sortColumns;
          state.loading = false;
          state.error = null;
        })
        .addCase(rejected, defaultRejected);
    }

    function getTradesReducer() {
      const { pending, fulfilled, rejected } = extraActions.getTrades;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          const tradeData = action.payload;

          state.trades = tradeData.trades;
          state.page = tradeData.page;
          state.limit = tradeData.limit;
          state.totalItems = tradeData.total;
          state.totalPages = Math.ceil(tradeData.total / tradeData.limit);
          state.loading = false;
          state.error = null;
        })
        .addCase(rejected, defaultRejected);
    }

    function createNewTradeReducer() {
      const { pending, fulfilled, rejected } = extraActions.createNewTrade;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilledReducer)
        .addCase(rejected, defaultRejected);
    }

    function editTradeReducer() {
      const { pending, fulfilled, rejected } = extraActions.editTrade;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilledReducer)
        .addCase(rejected, defaultRejected);
    }

    function deleteMultipleTradesReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.deleteMultipleTrades;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilledReducer)
        .addCase(rejected, defaultRejected);
    }
  };
}
