import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBearerToken } from "../../_helpers/getBearerToken";
import * as httpService from "../../_helpers/httpService";

export const saveJournalEntryAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/saveJournalEntry`,
    async (newJournalEntry, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const journalUrl = `${baseUrl}`;
        const { data, error } = await httpService.post(
          journalUrl,
          newJournalEntry,
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

export const deleteJournalEntryAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/deleteMultipleJournalEntries`,
    async (journalsToDelete, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const journalUrl = `${baseUrl}/multiple`;
        const { data, error } = await httpService.post(
          journalUrl,
          journalsToDelete,
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

export const editJournalEntryAction = (baseUrl) => {
  return createAsyncThunk(
    `${name}/editJournalEntry`,
    async (editedJournalEntry, { rejectWithValue }) => {
      try {
        const bearerToken = await getBearerToken();
        const journalUrl = `${baseUrl}/${editedJournalEntry.journalId}`;
        const { data, error } = await httpService.patch(
          journalUrl,
          editedJournalEntry,
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
