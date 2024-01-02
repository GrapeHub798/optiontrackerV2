import { store, userActions } from "../_store";

const getUserState = () => {
  const state = store.getState();
  return state.user;
};

export const getBearerToken = async () => {
  const { user } = getUserState();

  const jwt = getJWTFromUser(user);
  if (jwt) {
    return jwt;
  }
  const refreshToken = user.refreshToken;
  await store.dispatch(userActions.refreshTokens({ refreshToken }));

  const updatedUser = getUserState();
  const updatedJWT = getJWTFromUser(updatedUser?.user);
  if (!updatedJWT) {
    store.dispatch(userActions.logout());
    throw new Error("Un-Authorized User");
  }
  return updatedJWT;
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
