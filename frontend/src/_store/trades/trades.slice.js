import { createSlice } from "@reduxjs/toolkit";

import {
  createUserProfileAction,
  editUserProfileAction,
  getUserProfileAction,
} from "../userprofile/userprofile.actions";

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
  const baseUrl = `${process.env.REACT_APP_API_URL}/trades`;

  return {
    getTrades: getTradesAction(baseUrl),
    createNewTrade: createNewTradeAction(baseUrl),
    editTrade: editTradection(baseUrl),
    deleteTrade: deleteTradeAction(baseUrl),
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
