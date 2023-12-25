import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "./getBearerToken";

export const getStocksAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/getStocks`,
    async (_, { rejectWithValue }) => {
      const bearerToken = await getBearerToken();
      try {
        const response = await fetch(`${baseUrl}`, {
          Method: "GET",
          Headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          Cache: "default",
        });
        if (!response.ok) {
          const errors = await response.json();
          return rejectWithValue(errors?.message);
        }
        return response.json();
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    },
  );
};
