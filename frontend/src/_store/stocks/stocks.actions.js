import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";
import { INDEXEDDB_STOCK_KEY } from "../../shared/sharedConstants";
import store from "../index";
import { readArray, writeArray } from "../indexedDb";

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
      stocks = await readArray(INDEXEDDB_STOCK_KEY);
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
        await writeArray(INDEXEDDB_STOCK_KEY, data);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};
