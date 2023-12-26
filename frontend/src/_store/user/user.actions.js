import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";

const generalUserRequest = async (url, outgoingData, rejectWithValue) => {
  try {
    const { data, error } = await httpService.post(url, outgoingData);
    if (error) return rejectWithValue(error);
    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
};
export const loginAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/login`,
    async ({ email, password }, { rejectWithValue }) => {
      const loginURL = `${baseUrl}/login`;
      const data = { email, password };
      return generalUserRequest(loginURL, data, rejectWithValue);
    },
  );
};

export const refreshTokensAction = (refreshUrl) => {
  return createAsyncThunk(
    `${name}/refreshToken`,
    async ({ refreshToken }, { rejectWithValue }) => {
      try {
        const { data, error } = await httpService.post(refreshUrl, {
          refreshToken,
        });
        if (error) return rejectWithValue(error);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};

export const registerAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/register`,
    async ({ email, password }, { rejectWithValue }) => {
      const registerURL = `${baseUrl}/register`;
      const data = { email, password };
      return generalUserRequest(registerURL, data, rejectWithValue);
    },
  );
};

export const changePasswordAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/changePassword`,
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
      try {
        const changePasswordURL = `${baseUrl}/change-password`;
        const bearerToken = await getBearerToken();
        const changePasswordData = { oldPassword, newPassword };
        const { data, error } = await httpService.post(
          changePasswordURL,
          changePasswordData,
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
