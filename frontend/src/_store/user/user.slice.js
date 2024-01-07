import { createSlice } from "@reduxjs/toolkit";

import { history } from "../../_helpers/history";
import {
  APP_URL_PATHS,
  INDEXEDDB_STOCK_KEY,
} from "../../shared/sharedConstants";
import {
  defaultPendingReducer,
  defaultRejectedReducer,
} from "../defaultStoreReducers";
import { deleteArray } from "../indexedDb";
import {
  changePasswordAction,
  loginAction,
  refreshTokensAction,
  registerAction,
} from "./user.actions";

const name = "user";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ extraReducers, initialState, name, reducers });

export const userActions = { ...slice.actions, ...extraActions };
export const userReducer = slice.reducer;

function createInitialState() {
  let defaultUser = "";
  try {
    const localUserStorageData = localStorage.getItem("user");
    defaultUser = JSON.parse(localUserStorageData);
    // TODO investigate how we can log a person out but not? maybe monitor refresh token expiration
  } catch (e) {
    console.log(e);
  }

  return {
    user: defaultUser,
    error: null,
    success: false,
  };
}

function createReducers() {
  return {
    logout,
  };

  function logout(state) {
    state.user = null;
    localStorage.removeItem("user");
    //clean up the other local storage info
    localStorage.removeItem("userprofile");
    localStorage.removeItem("exchanges");
    localStorage.removeItem("brokers");
    //remove stocks
    deleteArray(INDEXEDDB_STOCK_KEY).then(() =>
      history.navigate(APP_URL_PATHS.HOME),
    );
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/user`;
  const refreshUrl = `${process.env.REACT_APP_API_URL}/auth`;

  return {
    login: loginAction(baseUrl),
    register: registerAction(baseUrl),
    refreshTokens: refreshTokensAction(refreshUrl),
    changePassword: changePasswordAction(baseUrl),
  };
}

function loginRegisterFulfilledReducer(state, action) {
  const user = action.payload;
  localStorage.setItem("user", JSON.stringify(user));
  state.user = user;
  state.success = true;
}

function createExtraReducers() {
  return (builder) => {
    loginReducer();
    registerReducer();
    refreshTokensReducer();
    changePasswordReducer();

    function changePasswordReducer() {
      const { pending, fulfilled, rejected } = extraActions.changePassword;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, (state) => {
          state.success = true;
        })
        .addCase(rejected, defaultRejectedReducer);
    }
    function refreshTokensReducer() {
      const { pending, fulfilled, rejected } = extraActions.refreshTokens;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, (state, action) => {
          const updatedUser = {
            ...state.user,
            ...action.payload,
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));
          state.user = updatedUser;
          state.success = true;
        })
        .addCase(rejected, defaultRejectedReducer);
    }
    function loginReducer() {
      const { pending, fulfilled, rejected } = extraActions.login;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, loginRegisterFulfilledReducer)
        .addCase(rejected, defaultRejectedReducer);
    }

    function registerReducer() {
      const { pending, fulfilled, rejected } = extraActions.register;
      builder
        .addCase(pending, defaultPendingReducer)
        .addCase(fulfilled, loginRegisterFulfilledReducer)
        .addCase(rejected, defaultRejectedReducer);
    }
  };
}

export default userReducer;
