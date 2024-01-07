import { createSlice } from "@reduxjs/toolkit";

import { defaultFulfilledReducer } from "../defaultStoreReducers";
import {
  createNewTradeAction,
  deleteMultipleTradesAction,
  editTradeAction,
  getTradesAction,
} from "./trades.actions";

const name = "trades";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });

export const tradesActions = { ...slice.actions, ...extraActions };
export const tradesReducer = slice.reducer;

function createInitialState() {
  return {
    trades: "",
    sortConfig: null,
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
    setSortConfig,
  };

  function setPage(state, action) {
    state.page = action.payload;
  }

  function setLimit(state, action) {
    state.limit = action.payload;
  }

  function setSortConfig(state, action) {
    state.sortConfig = action.payload;
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/trade`;

  return {
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
