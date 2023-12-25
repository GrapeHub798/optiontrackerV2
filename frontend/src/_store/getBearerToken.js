import { store, userActions } from "../_store";

const getUserState = () => {
  const state = store.getState();
  return state.user; // Access the user slice
};

export const getBearerToken = async () => {
  const { user } = getUserState();

  const jwt = getJWTFromUser(user);
  if (jwt) {
    return jwt;
  }
  //we need to get a new token
  const refreshToken = user.refreshToken;
  await store.dispatch(userActions.refreshTokens({ refreshToken }));

  //try once more
  const updatedUser = getUserState();
  return getJWTFromUser(updatedUser?.user);
};

const getJWTFromUser = (user) => {
  if (!user?.userId) {
    store.dispatch(userActions.logout());
    throw new Error("Un-Authorized User");
  }
  const authExpiration = new Date(user.tokenExpiration);
  const currentDate = new Date();
  if (currentDate < authExpiration) {
    return user.jwt;
  }
  return null;
};
