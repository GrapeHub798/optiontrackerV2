import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";
import store from "../index";
import { IndexedDBManager } from "../indexedDb.class";

const dbManager = new IndexedDBManager("osStockJournal", "osStockStore");
const stockIndexedDbKey = "stocks";
const getStockState = () => {
  const state = store.getState();
  return state.stocks;
};
export const loadDataAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/getStocks`,
    async ({ userPreferredExchange }, { rejectWithValue }) => {
      let { stocks } = getStockState();
      //try from redux first
      if (stocks && stocks.length > 0) {
        return stocks;
      }

      //try to read from indexeddb
      stocks = await dbManager.readArray(stockIndexedDbKey);
      if (stocks && stocks.length > 0) {
        return stocks;
      }

      try {
        const bearerToken = await getBearerToken();
        const getStocksUrl = `${baseUrl}/${userPreferredExchange}`;
        const { data, error } = await httpService.get(
          getStocksUrl,
          bearerToken,
        );
        if (error) return rejectWithValue(error);
        await dbManager.writeArray(stockIndexedDbKey, data);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};
