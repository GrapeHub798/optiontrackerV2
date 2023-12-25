import { configureStore } from "@reduxjs/toolkit";

import { exchangesReducer } from "./exchanges.slice";
//import { brokersReducer } from "./brokers.slice";
//import { stocksReducer } from "./stocks.slice";
import { userReducer } from "./user.slice";

//export * from "./brokers.slice";
export * from "./exchanges.slice";
//export * from "./stocks.slice";
export * from "./user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    exchanges: exchangesReducer,
    //brokers: brokersReducer,
    //stocks: stocksReducer,
  },
});

export default store;
