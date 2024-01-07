export const defaultPendingReducer = (state) => {
  state.error = null;
  if ("success" in state) {
    state.success = false;
  }
  if ("loading" in state) {
    state.loading = false;
  }
};

export const defaultRejectedReducer = (state, action) => {
  state.error = action.payload;
  if ("success" in state) {
    state.success = false;
  }
  if ("loading" in state) {
    state.loading = false;
  }
};

export const defaultFulfilledReducer = (state) => {
  if ("loading" in state) {
    state.loading = false;
  }
  state.error = null;
  if ("success" in state) {
    state.success = true;
  }
};
