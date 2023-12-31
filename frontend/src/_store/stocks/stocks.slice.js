import { createSlice } from "@reduxjs/toolkit";

import {
  getStocksAction,
  loadLocalStocksAction,
  updateLocalStocksAction,
} from "./stocks.actions";

const name = "stocks";

const initialState = await createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });
export const stocksActions = { ...slice.actions, ...extraActions };
export const stocksReducer = slice.reducer;

async function createInitialState() {
  return {
    stocks: "",
    error: null,
    success: false,
    isPopulated: false,
  };
}

function createReducers() {
  return {
    resetStatus,
  };

  function resetStatus(state) {
    state.success = false;
    state.error = null;
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/stocks`;

  return {
    getStocks: getStocksAction(baseUrl),
    loadLocalStocks: loadLocalStocksAction(),
    updateLocalStocks: updateLocalStocksAction(),
  };
}

function defaultPendingReducer(state) {
  state.error = null;
  state.success = false;
}

function defaultRejectedReducer(state, action) {
  state.error = action.payload;
  state.success = false;
}

function createExtraReducers() {
  return (builder) => {
    getStocksReducer();
    loadLocalStocksReducer();
    updateLocalStocksReducer();
    function getStocksReducer() {
      const { pending, fulfilled, rejected } = extraActions.getStocks;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, (state, action) => {
          const stocks = action.payload;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //await updateData("stocks", stocks);
          state.stocks = stocks;
          state.success = true;
        })
        .addCase(rejected, defaultRejectedReducer);
    }

    function loadLocalStocksReducer() {
      const { pending, fulfilled, rejected } = extraActions.loadLocalStocks;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, (state, action) => {
          const stocks = action.payload;
          state.isPopulated = true;
          state.stocks = stocks;
          state.success = true;
        })
        .addCase(rejected, defaultRejectedReducer);
    }

    function updateLocalStocksReducer() {
      const { pending, fulfilled, rejected } = extraActions.updateLocalStocks;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, (state) => {
          state.success = true;
          state.isPopulated = true;
        })
        .addCase(rejected, defaultRejectedReducer);
    }
  };
}
