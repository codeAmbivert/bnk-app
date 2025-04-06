"use client";

import { API_URL } from "@/helpers/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface WalletData {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

interface APIErrorResponse {
  message: string;
}

export const getUserWallet = createAsyncThunk("get-wallet", async () => {
  try {
    const response = await axios.get(`${API_URL}/wallet`);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError<APIErrorResponse>;
    const errorMsg = axiosError?.response?.data?.message || axiosError?.message;
    throw new Error(errorMsg || "An error occurred, please try again later");
  }
});

interface WalletState {
  data: null | WalletData;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState: WalletState = {
  data: null,
  status: "idle",
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    resetBankState: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserWallet.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserWallet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUserWallet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { resetBankState } = walletSlice.actions;
export default walletSlice.reducer;
