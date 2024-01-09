import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";
import store from "../index";

const getTradeState = () => {
  const state = store.getState();
  return state.trades;
};

const transformTableConfig = (paginatedTableConfig) => {
  return {
    ...paginatedTableConfig,
    sortColumns: JSON.stringify(paginatedTableConfig?.sortColumns),
    columnsOrder: JSON.stringify(paginatedTableConfig?.columnsOrder),
    columnVisibility: JSON.stringify(paginatedTableConfig?.columnVisibility),
  };
};

const paginatedTableThunk = (paginatedTableConfigUrl, prefix) => {
  return createAsyncThunk(
    `${name}/${prefix}`,
    async (paginatedTableConfig, { rejectWithValue }) => {
      const transformedTableConfig = transformTableConfig(paginatedTableConfig);

      try {
        const bearerToken = await getBearerToken();
        const { error } = await httpService.post(
          paginatedTableConfigUrl,
          transformedTableConfig,
          bearerToken,
        );
        if (error) return rejectWithValue(error);
        return {
          paginatedTableConfig,
        };
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};

export const getTableConfigAction = (paginatedTableConfigUrl) => {
  return createAsyncThunk(
    `${name}/getTableConfigExchanges`,
    async (defaultTableConfig, { rejectWithValue }) => {
      try {
        const getTableConfigUrl = `${paginatedTableConfigUrl}/${defaultTableConfig?.tableName}`;
        const bearerToken = await getBearerToken();
        const { data, error } = await httpService.get(
          getTableConfigUrl,
          bearerToken,
        );
        if (error) return rejectWithValue(error);
        return {
          defaultTableConfig,
          ...data,
        };
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};
export const setColumnsOrderAction = (paginatedTableConfigUrl) => {
  return paginatedTableThunk(paginatedTableConfigUrl, "setColumnsOrder");
};
export const setSortConfigAction = (paginatedTableConfigUrl) => {
  return paginatedTableThunk(paginatedTableConfigUrl, "setSortConfig");
};

export const setColumnVisibilityAction = (paginatedTableConfigUrl) => {
  return paginatedTableThunk(paginatedTableConfigUrl, "setColumnVisibility");
};

export const getTradesAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/getTrades`,
    async (
      { page = null, limit = null, sortColumn = null, sortDirection = null },
      { rejectWithValue },
    ) => {
      try {
        //if page and limit is null, get it from the state
        const tradeState = getTradeState();
        page = page || tradeState.page;
        limit = limit || tradeState.limit;

        sortColumn = sortColumn || tradeState?.sortConfig?.key;
        sortDirection = sortDirection || tradeState?.sortConfig?.direction;

        const sortString =
          sortColumn && sortDirection ? `/${sortColumn}/${sortDirection}` : "";

        const bearerToken = await getBearerToken();
        const tradeUrl = `${baseUrl}/${limit}/${page}${sortString}`;
        const { data, error } = await httpService.get(tradeUrl, bearerToken);
        if (error) return rejectWithValue(error);
        return {
          ...data,
          page,
          limit,
        };
      } catch (e) {
        return rejectWithValue(e.message);
      }
    },
  );
};

export const createNewTradeAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/createNewTrade`,
    async (newTrade, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const tradeUrl = `${baseUrl}`;
        const { data, error } = await httpService.post(
          tradeUrl,
          newTrade,
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

export const editTradeAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/editTrade`,
    async (editedTrade, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const tradeUrl = `${baseUrl}/${editedTrade.tradeId}`;
        const { data, error } = await httpService.put(
          tradeUrl,
          editedTrade,
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

export const deleteMultipleTradesAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/deleteMultipleTrades`,
    async (tradesToDelete, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const tradeUrl = `${baseUrl}/multiple`;
        const { data, error } = await httpService.post(
          tradeUrl,
          tradesToDelete,
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
