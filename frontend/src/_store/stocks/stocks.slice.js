import { createSlice } from "@reduxjs/toolkit";

import { IndexedDBManager } from "../indexedDb.class";
import { getStocksAction } from "./stocks.actions";

const name = "stocks";
const dbManager = new IndexedDBManager("osStockJournal", "osStockStore");
const initialState = await createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });
export const stocksActions = { ...slice.actions, ...extraActions };
export const stocksReducer = slice.reducer;

async function loadData(key) {
  try {
    const data = await dbManager.readArray(key);
    return { key, data };
  } catch (error) {
    console.error("Error loading data:", error);
    return { key, data: null };
  }
}

// Function to update data in IndexedDB
// eslint-disable-next-line no-unused-vars
async function updateData(key, array) {
  try {
    await dbManager.writeArray(key, array);
    return { key, array };
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

async function createInitialState() {
  try {
    // eslint-disable-next-line no-unused-vars
    const { key, data } = await loadData("stocks");
    return {
      stocks: data ?? "",
      error: null,
      success: false,
    };
  } catch (e) {
    console.log(e);
    return {
      stocks: "",
      error: null,
      success: false,
    };
  }
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
          state.success = false;
        })
        .addCase(fulfilled, async (state, action) => {
          const stocks = action.payload;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          await updateData("stocks", stocks);
          state.stocks = stocks;
          state.success = true;
        })
        .addCase(rejected, (state, action) => {
          state.error = action.payload;
          state.success = false;
        });
    }
  };
}
