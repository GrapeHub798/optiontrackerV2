import { createSlice } from "@reduxjs/toolkit";

import {
  defaultPendingReducer,
  defaultRejectedReducer,
} from "../defaultStoreReducers";
import {
  createBrokerAction,
  deleteBrokerAction,
  deleteMultipleBrokerAction,
  editBrokerAction,
  getAllBrokerAction,
} from "./brokers.actions";

const name = "brokers";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });

export const brokersActions = { ...slice.actions, ...extraActions };
export const brokersReducer = slice.reducer;

function createInitialState() {
  let defaultBrokers = "";
  try {
    const localBrokersStorageData = localStorage.getItem("brokers");
    defaultBrokers = JSON.parse(localBrokersStorageData);
  } catch (e) {
    console.log(e);
  }

  return {
    brokers: defaultBrokers,
    success: false,
    error: null,
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
  const baseUrl = `${process.env.REACT_APP_API_URL}/broker`;

  return {
    getAllBroker: getAllBrokerAction(baseUrl),
    createBroker: createBrokerAction(baseUrl),
    deleteBroker: deleteBrokerAction(baseUrl),
    editBroker: editBrokerAction(baseUrl),
    deleteMultipleBroker: deleteMultipleBrokerAction(baseUrl),
  };
}
function defaultFulfilled(state) {
  state.success = true;
  state.error = null;
}

function createExtraReducers() {
  return (builder) => {
    getAllBrokerReducer();
    createBrokerReducer();
    deleteBrokerReducer();
    editBrokerReducer();
    deleteMultipleBrokerReducer();

    function getAllBrokerReducer() {
      const { pending, fulfilled, rejected } = extraActions.getAllBroker;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, (state, action) => {
          const brokers = action.payload;
          localStorage.setItem("brokers", JSON.stringify(brokers));
          state.brokers = brokers;
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejectedReducer);
    }

    function createBrokerReducer() {
      const { pending, fulfilled, rejected } = extraActions.createBroker;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejectedReducer);
    }

    function deleteBrokerReducer() {
      const { pending, fulfilled, rejected } = extraActions.deleteBroker;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejectedReducer);
    }

    function editBrokerReducer() {
      const { pending, fulfilled, rejected } = extraActions.editBroker;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejectedReducer);
    }

    function deleteMultipleBrokerReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.deleteMultipleBroker;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejectedReducer);
    }
  };
}
