import { createSlice } from "@reduxjs/toolkit";

import { getStocksAction } from "./stocks.actions";

const name = "stocks";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });

export const stocksActions = { ...slice.actions, ...extraActions };
export const stocksReducer = slice.reducer;

function createInitialState() {
  return {
    // initialize state from local storage to enable user to stay logged in
    stocks: [],
    error: null,
  };
}

function createReducers() {}

async function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/stocks`;

  return {
    getStocks: getStocksAction(baseUrl),
  };
}

function createExtraReducers() {
  return (builder) => {
    getStocksReducer();
    function getStocksReducer() {
      const { pending, fulfilled, rejected } = extraActions.getStocks;
      builder
        .addCase(pending, (state) => {
          state.error = null;
        })
        .addCase(fulfilled, (state, action) => {
          const stocks = action.payload;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("stocks", JSON.stringify(stocks));
          state.stocks = stocks;
        })
        .addCase(rejected, (state, action) => {
          state.error = action.payload;
        });
    }
  };
}
