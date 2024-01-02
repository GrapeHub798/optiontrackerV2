import { createSlice } from "@reduxjs/toolkit";

import {
  createUserProfileAction,
  editUserProfileAction,
  getUserProfileAction,
} from "./userprofile.actions";

const name = "userprofile";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });

export const userprofileActions = { ...slice.actions, ...extraActions };
export const userprofileReducer = slice.reducer;

function createInitialState() {
  let defaultUserProfile = "";

  try {
    const localUserProfileStorageData = localStorage.getItem("userprofile");
    defaultUserProfile = JSON.parse(localUserProfileStorageData);
  } catch (e) {
    console.log(e);
  }

  return {
    userprofile: defaultUserProfile,
    error: null,
    success: false,
  };
}

function createReducers() {
  return {};
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/userprofile`;

  return {
    getUserProfile: getUserProfileAction(baseUrl),
    createUserProfile: createUserProfileAction(baseUrl),
    editUserProfile: editUserProfileAction(baseUrl),
  };
}

function defaultFulfilled(state, action) {
  const userprofile = action.payload;
  localStorage.setItem("userprofile", JSON.stringify(userprofile));
  state.userprofile = userprofile;
  state.success = true;
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
    getUserProfileReducer();
    createUserProfileReducer();
    editUserProfileReducer();
    function getUserProfileReducer() {
      const { pending, fulfilled, rejected } = extraActions.getUserProfile;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }

    function createUserProfileReducer() {
      const { pending, fulfilled, rejected } = extraActions.createUserProfile;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }

    function editUserProfileReducer() {
      const { pending, fulfilled, rejected } = extraActions.editUserProfile;
      builder
        .addCase(pending, defaultPending)
        .addCase(fulfilled, defaultFulfilled)
        .addCase(rejected, defaultRejected);
    }
  };
}
