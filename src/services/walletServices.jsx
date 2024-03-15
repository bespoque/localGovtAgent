import axios, { ApiNoAuth } from "./apiAdapter";

export const fetchWalletBalance = async () =>
    axios.post(`/wallet/balance`);

export const fetchTransactionHistory = async () =>
    axios.post(`/wallet/transaction-history`);

export const fetchTransactionDetails = async (params) =>
    axios.post(`wallet/transaction-details`, params);
    
export const fetchWalletFundStatus = async () =>
    axios.post(`/wallet/check-wallet-fund-status`);
    
export const fetWalletDetails = async () =>
    axios.post(`/wallet/get-wallet-details`);
    