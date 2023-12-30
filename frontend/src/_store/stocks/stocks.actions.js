import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";

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
