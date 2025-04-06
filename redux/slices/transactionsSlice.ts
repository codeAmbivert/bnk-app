"use client";

import { API_URL } from "@/helpers/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface TransactionData {
  amount: number;
  metadata: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name: string;
  };
  payment_reference: string;
  status: string;
  type: string;
  date: string;
}

interface APIErrorResponse {
  message: string;
}

export const getUserTransactions = createAsyncThunk(
  "get-transactions",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      return response?.data;
    } catch (error) {
      const axiosError = error as AxiosError<APIErrorResponse>;
      const errorMsg =
        axiosError?.response?.data?.message || axiosError?.message;
      throw new Error(errorMsg || "An error occurred, please try again later");
    }
  }
);

interface TransactionsState {
  data: null | TransactionData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState: TransactionsState = {
  data: null,
  status: "idle",
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTransactions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
