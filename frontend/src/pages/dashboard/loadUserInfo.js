import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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
  const [gettingProfile, setGettingProfile] = useState(false);
  const [gettingBrokers, setGettingBrokers] = useState(false);
  const [gettingStocks, setGettingStocks] = useState(false);

  const dispatch = useDispatch();
  const userProfile = useSelector((x) => x.userprofile.userprofile);
  const userProfileError = useSelector((x) => x.userprofile.error);

  const brokers = useSelector((x) => x.brokers.brokers);
  const brokersError = useSelector((x) => x.brokers.error);

  const stocks = useSelector((x) => x.stocks.stocks);
  const stocksError = useSelector((x) => x.stocks.error);
  const stocksSuccess = useSelector((x) => x.stocks.success);
  const stocksIsPopulated = useSelector((x) => x.stocks.isPopulated);

  //load in user preferences, brokers, stocks and exchanges

  //user profile first to get preferred exchange
  const fetchUserProfile = async () => {
    changeLoadingText("User Profile");
    setGettingProfile(true);
    await dispatch(userprofileActions.getUserProfile());
  };

  const fetchBrokers = async () => {
    changeLoadingText("Brokers & Stocks");
    setGettingBrokers(true);
    await dispatch(brokersActions.getAllBroker());
  };

  const fetchLocalStocks = async () => {
    setGettingStocks(true);
    //try to get the stocks from indexedDb first
    await fetchStockLocal();

    if (!stocksSuccess && !stocks) {
      await fetchStockAPI();
    }
  };

  const fetchStockLocal = async () => {
    await dispatch(
      stocksActions.loadLocalStocks({
        key: "stocks",
      }),
    );
  };
  const fetchStockAPI = async () => {
    await dispatch(
      stocksActions.getStocks({
        userPreferredExchange: userProfile.preferredExchange,
      }),
    );
  };

  const updateStocks = async () => {
    await dispatch(
      stocksActions.updateLocalStocks({
        key: "stocks",
        array: stocks,
      }),
    );
  };

  useEffect(() => {
    if (!userProfile) {
      return;
    }
    setGettingProfile(false);
    //once we get the user profile we need the brokers and stocks
    if (!brokers && !gettingBrokers) {
      fetchBrokers();
    }

    if (!stocks && !gettingStocks) {
      fetchLocalStocks();
    }
  }, [userProfile]);

  useEffect(() => {
    if (!brokers || !stocks) {
      return;
    }

    if (stocks && stocks.length > 0 && !stocksIsPopulated) {
      updateStocks();
    }

    setGettingStocks(false);
    setGettingBrokers(false);
    changeLoadingStatus(false);
  }, [brokers, stocks]);

  useEffect(() => {
    //check user profile
    if (!userProfile && !gettingProfile) {
      fetchUserProfile();
    }
  }, []);

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
