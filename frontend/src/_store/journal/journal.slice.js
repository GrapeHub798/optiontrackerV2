import { createSlice } from "@reduxjs/toolkit";

import {
  defaultFulfilledReducer,
  defaultPendingReducer,
  defaultRejectedReducer,
} from "../defaultStoreReducers";
import {
  deleteJournalEntryAction,
  editJournalEntryAction,
  saveJournalEntryAction,
} from "./journal.actions";

const name = "journal";

const initialState = await createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });
export const journalActions = { ...slice.actions, ...extraActions };
export const journalReducer = slice.reducer;

async function createInitialState() {
  return {
    error: null,
    success: false,
  };
}

function createReducers() {
  return {
    resetStatus,
  };

  function resetStatus(state) {
    state.success = false;
    state.error = null;
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/journal`;

  return {
    saveJournalEntry: saveJournalEntryAction(baseUrl),
    deleteJournalEntry: deleteJournalEntryAction(baseUrl),
    editJournalEntry: editJournalEntryAction(baseUrl),
  };
}

function createExtraReducers() {
  return (builder) => {
    saveJournalEntryReducer();
    deleteJournalEntryReducer();
    editJournalEntryReducer();

    function saveJournalEntryReducer() {
      const { pending, fulfilled, rejected } = extraActions.saveJournalEntry;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, defaultFulfilledReducer)
        .addCase(rejected, defaultRejectedReducer);
    }
    function deleteJournalEntryReducer() {
      const { pending, fulfilled, rejected } = extraActions.deleteJournalEntry;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, defaultFulfilledReducer)
        .addCase(rejected, defaultRejectedReducer);
    }

    function editJournalEntryReducer() {
      const { pending, fulfilled, rejected } = extraActions.editJournalEntry;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, defaultFulfilledReducer)
        .addCase(rejected, defaultRejectedReducer);
    }
  };
}
