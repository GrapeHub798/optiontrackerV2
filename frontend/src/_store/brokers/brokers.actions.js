import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";

export const getAllBrokerAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/getAllBroker`,
    async (_, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const brokersUrl = `${baseUrl}`;
        const { data, error } = await httpService.get(brokersUrl, bearerToken);
        if (error) return rejectWithValue(error);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};

export const createBrokerAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/createBroker`,
    async (newBroker, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const brokerUrl = `${baseUrl}`;
        const { data, error } = await httpService.post(
          brokerUrl,
          newBroker,
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

export const deleteBrokerAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/deleteBroker`,
    async ({ brokerId }, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const brokerUrl = `${baseUrl}/${brokerId}`;
        const { data, error } = await httpService.del(brokerUrl, bearerToken);
        if (error) return rejectWithValue(error);
        return data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};

export const deleteMultipleBrokerAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/deleteMultipleBroker`,
    async (brokersToDelete, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const brokerUrl = `${baseUrl}/multiple`;
        const { data, error } = await httpService.post(
          brokerUrl,
          brokersToDelete,
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

export const editBrokerAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/editBroker`,
    async (editedBroker, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const brokerUrl = `${baseUrl}/${editedBroker.brokerId}`;
        const { data, error } = await httpService.patch(
          brokerUrl,
          editedBroker,
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
