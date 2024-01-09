import {
  TRADELOGCOLUMNORDER_LS_KEY,
  TRADELOGCOLUMNVISIBILITY_LS_KEY,
  TRADELOGSORT_LS_KEY,
} from "../trades/trades.slice";

export const logoutCleanup = () => {
  localStorage.removeItem("user");
  //clean up the other local storage info
  localStorage.removeItem("userprofile");
  localStorage.removeItem("exchanges");
  localStorage.removeItem("brokers");

  localStorage.removeItem(TRADELOGSORT_LS_KEY);
  localStorage.removeItem(TRADELOGCOLUMNORDER_LS_KEY);
  localStorage.removeItem(TRADELOGCOLUMNVISIBILITY_LS_KEY);
};
