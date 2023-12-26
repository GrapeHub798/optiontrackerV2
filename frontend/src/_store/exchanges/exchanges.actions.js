import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";

export const getExchangesAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/getExchanges`,
    async (_, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const { data, error } = await httpService.get(baseUrl, bearerToken);
        if (error) return rejectWithValue(error);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};
