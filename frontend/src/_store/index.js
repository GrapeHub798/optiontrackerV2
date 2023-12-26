import { configureStore } from "@reduxjs/toolkit";

import { exchangesReducer } from "./exchanges/exchanges.slice";
//import { brokersReducer } from "./brokers.slice";
//import { stocksReducer } from "./stocks.slice";
import { userReducer } from "./user/user.slice";
import { userprofileReducer } from "./userprofile/userprofile.slice";

//export * from "./brokers.slice";
export * from "./exchanges/exchanges.slice";
//export * from "./stocks.slice";
export * from "./user/user.slice";
export * from "./userprofile/userprofile.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    exchanges: exchangesReducer,
    userprofile: userprofileReducer,
    //brokers: brokersReducer,
    //stocks: stocksReducer,
  },
});

export default store;
