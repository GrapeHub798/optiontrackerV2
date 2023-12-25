import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../_store";

export const Logout = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((x) => x.user.user);

  useEffect(() => {
    if (!authUser?.userId) {
      return;
    }
    dispatch(userActions.logout());
  }, [authUser]);
  return <div className="col-md-6 offset-md-3 mt-5">Thank You!</div>;
};
