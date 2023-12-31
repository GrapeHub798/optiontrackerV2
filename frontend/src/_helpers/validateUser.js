export const isValidUser = (user) => {
  if (!user) {
    return false;
  }

  if (!user?.jwt) {
    return false;
  }
  //check expiration
  const authExpiration = new Date(user?.tokenExpiration);
  const currentDate = new Date();
  if (!authExpiration || currentDate >= authExpiration) {
    return false;
  }
  return true;
};
