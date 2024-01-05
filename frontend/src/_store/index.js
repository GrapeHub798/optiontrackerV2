import { configureStore } from "@reduxjs/toolkit";

import { analysisReducer } from "./analysis/analysis.slice";
import { brokersReducer } from "./brokers/brokers.slice";
import { exchangesReducer } from "./exchanges/exchanges.slice";
import { stocksReducer } from "./stocks/stocks.slice";
import { tradesReducer } from "./trades/trades.slice";
import { userReducer } from "./user/user.slice";
import { userprofileReducer } from "./userprofile/userprofile.slice";

export * from "./analysis/analysis.slice";
export * from "./brokers/brokers.slice";
export * from "./exchanges/exchanges.slice";
export * from "./stocks/stocks.slice";
export * from "./trades/trades.slice";
export * from "./user/user.slice";
export * from "./userprofile/userprofile.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    exchanges: exchangesReducer,
    userprofile: userprofileReducer,
    trades: tradesReducer,
    brokers: brokersReducer,
    stocks: stocksReducer,
    analysis: analysisReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
