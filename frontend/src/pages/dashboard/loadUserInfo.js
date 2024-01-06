import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { displayError } from "../../_helpers/errorhelper";
import {
  brokersActions,
  stocksActions,
  userprofileActions,
} from "../../_store";

export const LoadUserInfo = ({
  isLoading,
  changeLoadingStatus,
  changeLoadingText,
}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((x) => x.userprofile.userprofile);
  const userProfileError = useSelector((x) => x.userprofile.error);

  const brokers = useSelector((x) => x.brokers.brokers);
  const brokersError = useSelector((x) => x.brokers.error);

  const stocks = useSelector((x) => x.stocks.stocks);
  const stocksError = useSelector((x) => x.stocks.error);

  const fetchUserProfile = async () => {
    changeLoadingText("User Profile");
    await dispatch(userprofileActions.getUserProfile());
  };

  const fetchStocks = async () => {
    //try to get the stocks from indexedDb first
    await dispatch(
      stocksActions.loadData({
        userPreferredExchange: userProfile.preferredExchange,
      }),
    );
  };

  const fetchBrokers = async () => {
    changeLoadingText("Brokers & Stocks");
    await dispatch(brokersActions.getAllBroker());
  };

  useEffect(() => {
    //check user profile
    if (!userProfile) {
      fetchUserProfile();
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile && !stocks) {
      fetchStocks();
    }

    if (userProfile && !brokers) {
      fetchBrokers();
    }
  }, [userProfile, stocks, brokers]);

  useEffect(() => {
    if (userProfile && stocks && brokers) {
      changeLoadingStatus(false);
    }
  }, [userProfile, stocks, brokers]);

  return (
    <>
      {!isLoading && (userProfileError || brokersError || stocksError) && (
        <>
          {userProfileError && (
            <Alert variant="danger" className="my-3" dismissible>
              {displayError(userProfileError)}
            </Alert>
          )}

          {brokersError && (
            <Alert variant="danger" className="my-3" dismissible>
              {displayError(brokersError)}
            </Alert>
          )}

          {stocksError && (
            <Alert variant="danger" className="my-3" dismissible>
              {displayError(stocksError)}
            </Alert>
          )}
        </>
      )}
    </>
  );
};

LoadUserInfo.propTypes = {
  isLoading: PropTypes.bool,
  changeLoadingStatus: PropTypes.func,
  changeLoadingText: PropTypes.func,
};
