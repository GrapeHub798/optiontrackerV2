import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";

export const getTradesAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/getTrades`,
    async ({ page, limit }, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const tradeUrl = `${baseUrl}/${limit}/${page}`;
        const { data, error } = await httpService.get(tradeUrl, bearerToken);
        if (error) return rejectWithValue(error);
        return {
          ...data,
          page,
          limit,
        };
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};

export const createNewTradeAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/createNewTrade`,
    async (newTrade, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const tradeUrl = `${baseUrl}`;
        const { data, error } = await httpService.post(
          tradeUrl,
          newTrade,
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

export const editTradeAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/editTrade`,
    async (editedTrade, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const tradeUrl = `${baseUrl}/${editedTrade.tradeId}`;
        const { data, error } = await httpService.put(
          tradeUrl,
          editedTrade,
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

export const deleteTradeAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/deleteTrade`,
    async ({ tradeId }, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const tradeUrl = `${baseUrl}/${tradeId}`;
        const { data, error } = await httpService.del(tradeUrl, bearerToken);
        if (error) return rejectWithValue(error);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};

export const deleteMultipleTradesAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/deleteMultipleTrades`,
    async (tradesToDelete, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const tradeUrl = `${baseUrl}/multiple`;
        const { data, error } = await httpService.post(
          tradeUrl,
          tradesToDelete,
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
