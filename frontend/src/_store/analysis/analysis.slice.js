import { createSlice } from "@reduxjs/toolkit";

import {
  getAccountValueAction,
  getAccountValueByBrokerAction,
  getMostTradedByAmountAction,
  getMostTradedByQuantityAction,
  getMostTradedByTradesAction,
  getPerformanceByAmountDataAction,
  getPerformanceByTradeDataAction,
  getTradesLast7Action,
  getTradesLast7AmountAction,
  getWinLossesByStockAction,
} from "./analysis.actions";
import { performanceChartTransformer } from "./dataTransformers/performanceChartTransformer";
import { tradesLast7Transformer } from "./dataTransformers/tradesLast7Transformer";
import { winLossesByStockTransformer } from "./dataTransformers/winLossesByStockTransformer";

const name = "analysis";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });

export const analysisActions = { ...slice.actions, ...extraActions };
export const analysisReducer = slice.reducer;

function createInitialState() {
  return {
    mostTradedByQuantity: "",
    mostTradedByTrades: "",
    mostTradedByAmount: "",
    tradesLast7: "",
    tradesLast7Amount: "",
    performanceByTradeData: "",
    performanceByAmountData: "",
    winLossesByStock: "",
    accountValueByBroker: "",
    accountValue: "",
    riskAnalysis: "",
    success: false,
    error: null,
  };
}

function createReducers() {
  return {};
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/analysis`;

  return {
    getMostTradedByQuantity: getMostTradedByQuantityAction(baseUrl),
    getMostTradedByTrades: getMostTradedByTradesAction(baseUrl),
    getMostTradedByAmount: getMostTradedByAmountAction(baseUrl),
    getTradesLast7: getTradesLast7Action(baseUrl),
    getTradesLast7Amount: getTradesLast7AmountAction(baseUrl),
    getPerformanceByTradeData: getPerformanceByTradeDataAction(baseUrl),
    getWinLossesByStock: getWinLossesByStockAction(baseUrl),
    getAccountValueByBroker: getAccountValueByBrokerAction(baseUrl),
    getAccountValue: getAccountValueAction(baseUrl),
    getPerformanceByAmountData: getPerformanceByAmountDataAction(baseUrl),
  };
}

function defaultPending(state) {
  state.error = null;
  state.success = false;
}

function defaultRejected(state, action) {
  state.error = action.payload;
  state.success = false;
}

function createExtraReducers() {
  return (builder) => {
    getMostTradedByQuantityReducer();
    getMostTradedByTradesReducer();
    getMostTradedByAmountReducer();
    getTradesLast7Reducer();
    getTradesLast7AmountReducer();
    getPerformanceByTradeDataReducer();
    getWinLossesByStockReducer();
    getAccountValueByBrokerReducer();
    getAccountValueReducer();
    getPerformanceByAmountDataReducer();

    function getMostTradedByAmountReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.getMostTradedByAmount;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          state.mostTradedByAmount = action.payload;
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }

    function getMostTradedByQuantityReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.getMostTradedByQuantity;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          state.mostTradedByQuantity = action.payload;
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }

    function getMostTradedByTradesReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.getMostTradedByTrades;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          state.mostTradedByTrades = action.payload;
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }

    function getTradesLast7Reducer() {
      const { pending, fulfilled, rejected } = extraActions.getTradesLast7;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          state.tradesLast7 = tradesLast7Transformer(action.payload);
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }

    function getTradesLast7AmountReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.getTradesLast7Amount;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          state.tradesLast7Amount = tradesLast7Transformer(
            action.payload,
            true,
          );
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }

    function getPerformanceByTradeDataReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.getPerformanceByTradeData;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          state.performanceByTradeData = performanceChartTransformer(
            action.payload,
          );
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }

    function getPerformanceByAmountDataReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.getPerformanceByAmountData;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          state.performanceByAmountData = performanceChartTransformer(
            action.payload,
            true,
          );
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }

    function getWinLossesByStockReducer() {
      const { pending, fulfilled, rejected } = extraActions.getWinLossesByStock;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          state.winLossesByStock = winLossesByStockTransformer(action.payload);
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }

    function getAccountValueByBrokerReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.getAccountValueByBroker;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          state.accountValueByBroker = action.payload;
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }

    function getAccountValueReducer() {
      const { pending, fulfilled, rejected } = extraActions.getAccountValue;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          state.accountValue = action.payload;
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }
  };
}
