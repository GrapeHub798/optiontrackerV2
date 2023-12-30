import { createSlice } from "@reduxjs/toolkit";

import {
  createNewTradeAction,
  deleteMultipleTradesAction,
  deleteTradeAction,
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
    items: [], // array to hold the data items
    page: 1, // current page
    limit: 10, // items per page
    totalItems: 0, // total number of items
    totalPages: 0, // total number of pages
    loading: false, // indicates loading state
    error: null, // holds
  };
}

function createReducers() {
  return {};
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/trade`;

  return {
    //note page and limit need to be sent to get trades action
    getTrades: getTradesAction(baseUrl),
    createNewTrade: createNewTradeAction(baseUrl),
    editTrade: editTradeAction(baseUrl),
    deleteTrade: deleteTradeAction(baseUrl),
    deleteMultipleTrades: deleteMultipleTradesAction(baseUrl),
  };
}

function defaultPending(state) {
  state.loading = true;
  state.error = null;
}

function defaultFulfilled(state) {
  state.loading = false;
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
    deleteTradeReducer();
    deleteMultipleTradesReducer();

    function getTradesReducer() {
      const { pending, fulfilled, rejected } = extraActions.getTrades;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          const tradeData = action.payload;

          state.items = tradeData.trades;
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
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }

    function editTradeReducer() {
      const { pending, fulfilled, rejected } = extraActions.editTrade;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }

    function deleteTradeReducer() {
      const { pending, fulfilled, rejected } = extraActions.deleteTrade;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }

    function deleteMultipleTradesReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.deleteMultipleTrades;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }
  };
}