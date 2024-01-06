import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";

const baseAnalysisThunk = (prefix, baseUrl, endPoint) => {
  return createAsyncThunk(
    `${name}/${prefix}`,
    async (_, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const { data, error } = await httpService.get(
          `${baseUrl}/${endPoint}`,
          bearerToken,
        );
        if (error) return rejectWithValue(error);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};

export const getMostTradedByQuantityAction = (baseUrl) => {
  const urlEndpoint = "mostTradedByQuantity";
  return baseAnalysisThunk("getMostTradedByQuantity", baseUrl, urlEndpoint);
};

export const getMostTradedByAmountAction = (baseUrl) => {
  const urlEndpoint = "mostTradedByAmount";
  return baseAnalysisThunk("getMostTradedByAmount", baseUrl, urlEndpoint);
};

export const getMostTradedByTradesAction = (baseUrl) => {
  const urlEndpoint = "mostTradedByTrades";
  return baseAnalysisThunk("getMostTradedByTrades", baseUrl, urlEndpoint);
};

export const getTradesLast7Action = (baseUrl) => {
  const urlEndpoint = "tradesLast7";
  return baseAnalysisThunk("getTradesLast7", baseUrl, urlEndpoint);
};

export const getTradesLast7AmountAction = (baseUrl) => {
  const urlEndpoint = "tradesLast7Amount";
  return baseAnalysisThunk("getTradesLast7Amount", baseUrl, urlEndpoint);
};

export const getPerformanceByTradeDataAction = (baseUrl) => {
  const urlEndpoint = "performanceByTradeData";
  return baseAnalysisThunk("getPerformanceByTradeData", baseUrl, urlEndpoint);
};

export const getPerformanceByAmountDataAction = (baseUrl) => {
  const urlEndpoint = "performanceByAmountData";
  return baseAnalysisThunk("getPerformanceByAmountData", baseUrl, urlEndpoint);
};

export const getBiggestLossByStockAction = (baseUrl) => {
  const urlEndpoint = "biggestLossByStock";
  return baseAnalysisThunk("getBiggestLossByStock", baseUrl, urlEndpoint);
};

export const getWinLossByStockAction = (baseUrl) => {
  const urlEndpoint = "winLossByStock";
  return baseAnalysisThunk("getWinLossByStock", baseUrl, urlEndpoint);
};

export const getAccountValueByBrokerAction = (baseUrl) => {
  const urlEndpoint = "accountValueByBroker";
  return baseAnalysisThunk("getAccountValueByBroker", baseUrl, urlEndpoint);
};

export const getWinLossPercentageAction = (baseUrl) => {
  const urlEndpoint = "winLossPercentage";
  return baseAnalysisThunk("getWinLossPercentage", baseUrl, urlEndpoint);
};
export const getAccountValueAction = (baseUrl) => {
  const urlEndpoint = "accountValue";
  return baseAnalysisThunk("getAccountValue", baseUrl, urlEndpoint);
};
