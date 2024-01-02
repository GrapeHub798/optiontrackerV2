import { createSlice } from "@reduxjs/toolkit";

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
function defaultPending(state) {
  state.error = null;
  state.success = false;
}

function defaultRejected(state, action) {
  state.error = action.payload;
  state.success = false;
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
        .addCase(pending, defaultPending)
        .addCase(fulfilled, (state, action) => {
          const brokers = action.payload;
          localStorage.setItem("brokers", JSON.stringify(brokers));
          state.brokers = brokers;
          state.error = null;
          state.success = false;
        })
        .addCase(rejected, defaultRejected);
    }

    function createBrokerReducer() {
      const { pending, fulfilled, rejected } = extraActions.createBroker;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }

    function deleteBrokerReducer() {
      const { pending, fulfilled, rejected } = extraActions.deleteBroker;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }

    function editBrokerReducer() {
      const { pending, fulfilled, rejected } = extraActions.editBroker;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }

    function deleteMultipleBrokerReducer() {
      const { pending, fulfilled, rejected } =
        extraActions.deleteMultipleBroker;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }
  };
}
