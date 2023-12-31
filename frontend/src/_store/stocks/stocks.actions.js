import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";
import { IndexedDBManager } from "../indexedDb.class";

const dbManager = new IndexedDBManager("osStockJournal", "osStockStore");
export const getStocksAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/getStocks`,
    async ({ userPreferredExchange }, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const getStocksUrl = `${baseUrl}/${userPreferredExchange}`;
        const { data, error } = await httpService.get(
          getStocksUrl,
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

export const loadLocalStocksAction = () => {
  return createAsyncThunk(
    `${name}/loadLocalStocks`,
    async (key, { rejectWithValue }) => {
      try {
        const data = await dbManager.readArray(key);
        if (!data.data) {
          rejectWithValue("no stocks");
        }
        return { data };
      } catch (error) {
        return rejectWithValue(error.toString());
      }
    },
  );
};

export const updateLocalStocksAction = () => {
  return createAsyncThunk(
    `${name}/updateLocalStocks`,
    async ({ key, array }, { rejectWithValue }) => {
      try {
        await dbManager.writeArray(key, array);
        return true;
      } catch (error) {
        return rejectWithValue(error.toString());
      }
    },
  );
};
