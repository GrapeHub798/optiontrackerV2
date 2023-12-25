import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "./getBearerToken";

export const getExchangesAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/getExchanges`,
    async (_, { rejectWithValue }) => {
      const bearerToken = await getBearerToken();
      try {
        const response = await fetch(`${baseUrl}`, {
          method: "GET",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          cache: "default",
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
