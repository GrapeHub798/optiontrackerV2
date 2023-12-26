import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";

export const getUserProfileAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/getUserProfile`,
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

export const createUserProfileAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/createUserProfile`,
    async ({ preferredExchange, preferredLanguage }, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const userProfileData = { preferredExchange, preferredLanguage };
        // eslint-disable-next-line no-unused-vars
        const { data, error } = await httpService.post(
          baseUrl,
          userProfileData,
          bearerToken,
        );
        if (error) return rejectWithValue(error);
        return userProfileData;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};

export const editUserProfileAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/editUserProfile`,
    async ({ preferredExchange, preferredLanguage }, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const userProfileData = { preferredExchange, preferredLanguage };
        // eslint-disable-next-line no-unused-vars
        const { data, error } = await httpService.put(
          baseUrl,
          userProfileData,
          bearerToken,
        );
        if (error) return rejectWithValue(error);
        return userProfileData;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};
