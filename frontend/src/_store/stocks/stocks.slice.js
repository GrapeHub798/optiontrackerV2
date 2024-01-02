import { createSlice } from "@reduxjs/toolkit";

import { loadDataAction } from "./stocks.actions";

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
    loadData: loadDataAction(baseUrl),
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
    loadDataReducer();
    function loadDataReducer() {
      const { pending, fulfilled, rejected } = extraActions.loadData;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, (state, action) => {
          const stocks = action.payload;
          state.stocks = stocks;
          state.success = true;
        })
        .addCase(rejected, defaultRejectedReducer);
    }
  };
}
