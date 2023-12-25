import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/login`,
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
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

export const refreshTokensAction = (refreshUrl) => {
  return createAsyncThunk(
    `${name}/refreshToken`,
    async ({ refreshToken }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${refreshUrl}`, {
          method: "POST",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
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

export const registerAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/register`,
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${baseUrl}/register`, {
          method: "POST",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
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
