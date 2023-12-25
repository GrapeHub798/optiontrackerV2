import { createSlice } from "@reduxjs/toolkit";

import { getExchangesAction } from "./exchanges.sliceImpl";

const name = "exchanges";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });
export const exchangesActions = { ...slice.actions, ...extraActions };
export const exchangesReducer = slice.reducer;

function createInitialState() {
  let defaultExchanges = "";
  try {
    const localExchangeStorageData = localStorage.getItem("exchanges");
    defaultExchanges = JSON.parse(localExchangeStorageData);
  } catch (e) {
    console.log(e);
  }
  return {
    // initialize state from local storage to enable user to stay logged in
    exchanges: defaultExchanges,
    error: null,
  };
}

function createReducers() {
  return {};
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/exchanges`;

  return {
    getExchanges: getExchangesAction(baseUrl),
  };
}

function createExtraReducers() {
  return (builder) => {
    getExchangesReducer();
    function getExchangesReducer() {
      const { pending, fulfilled, rejected } = extraActions.getExchanges;
      builder
        .addCase(pending, (state) => {
          state.error = null;
        })
        .addCase(fulfilled, (state, action) => {
          const exchanges = action.payload;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("exchanges", JSON.stringify(exchanges));
          state.exchanges = exchanges;
        })
        .addCase(rejected, (state, action) => {
          state.error = action.payload;
        });
    }
  };
}

export default exchangesReducer;
