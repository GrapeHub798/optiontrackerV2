import { createSlice } from "@reduxjs/toolkit";

import { history } from "../_helpers/history";
import {
  loginAction,
  refreshTokensAction,
  registerAction,
} from "./user.sliceImpl";

// create slice

const name = "user";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const userReducer = slice.reducer;

// implementation

function createInitialState() {
  let defaultUser = "";
  try {
    const localUserStorageData = localStorage.getItem("user");
    defaultUser = JSON.parse(localUserStorageData);
  } catch (e) {
    console.log(e);
  }

  return {
    // initialize state from local storage to enable user to stay logged in
    user: defaultUser,
    error: null,
  };
}

function createReducers() {
  return {
    logout,
  };

  function logout(state) {
    state.user = null;
    localStorage.removeItem("user");
    history.navigate("/");
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/user`;
  const refreshUrl = `${process.env.REACT_APP_API_URL}/auth`;

  return {
    login: loginAction(baseUrl),
    register: registerAction(baseUrl),
    refreshTokens: refreshTokensAction(refreshUrl),
  };
}

function createExtraReducers() {
  return (builder) => {
    loginReducer();
    registerReducer();
    refreshTokensReducer();

    function refreshTokensReducer() {
      const { pending, fulfilled, rejected } = extraActions.refreshTokens;
      builder
        .addCase(pending, (state) => {
          state.error = null;
        })
        .addCase(fulfilled, (state, action) => {
          debugger;
          const updatedUser = {
            ...state.user,
            ...action.payload,
          };

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(updatedUser));
          state.user = updatedUser;
        })
        .addCase(rejected, (state, action) => {
          state.error = action.payload;
        });
    }
    function loginReducer() {
      const { pending, fulfilled, rejected } = extraActions.login;
      builder
        .addCase(pending, (state) => {
          state.error = null;
        })
        .addCase(fulfilled, (state, action) => {
          const user = action.payload;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(user));
          state.user = user;
        })
        .addCase(rejected, (state, action) => {
          state.error = action.payload;
        });
    }

    function registerReducer() {
      const { pending, fulfilled, rejected } = extraActions.register;
      builder
        .addCase(pending, (state) => {
          state.error = null;
        })
        .addCase(fulfilled, (state, action) => {
          const user = action.payload;

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(user));
          state.user = user;
        })
        .addCase(rejected, (state, action) => {
          state.error = action.payload;
        });
    }
  };
}

export default userReducer;
