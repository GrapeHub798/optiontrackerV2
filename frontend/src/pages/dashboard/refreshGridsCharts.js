import store, { analysisActions, tradesActions } from "../../_store";

export const refreshTradeTable = async () => {
  //refresh Trade Table
  await store.dispatch(tradesActions.getTrades({}));
};

export const refreshGridsAndCharts = async () => {
  await refreshTradeTable();

  //Refresh last 7 Charts
  await store.dispatch(analysisActions.getTradesLast7({}));
  await store.dispatch(analysisActions.getTradesLast7Amount({}));

  //win loss chart
  await store.dispatch(analysisActions.getWinLossByStock({}));

  //refresh Performance By Trade
  await store.dispatch(analysisActions.getPerformanceByTradeData({}));
  //refresh Performance by Amount
  await store.dispatch(analysisActions.getPerformanceByAmountData({}));

  //Refresh Most Trade Stocks
  //By Quantity
  await store.dispatch(analysisActions.getMostTradedByQuantity({}));
  //By Trades
  await store.dispatch(analysisActions.getMostTradedByTrades({}));
  //By Amout
  await store.dispatch(analysisActions.getMostTradedByAmount({}));

  //account values
  await store.dispatch(analysisActions.getAccountValue({}));
  await store.dispatch(analysisActions.getWinLossPercentage({}));
};
