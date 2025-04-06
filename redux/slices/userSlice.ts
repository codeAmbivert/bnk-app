"use client";

import { API_URL } from "@/helpers/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}
interface APIErrorResponse {
  message: string;
}

export const getUser = createAsyncThunk("get-user", async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError<APIErrorResponse>;
    const errorMsg = axiosError?.response?.data?.message || axiosError?.message;
    throw new Error(errorMsg || "An error occurred, please try again later");
  }
});

interface UserState {
  data: null | UserData;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState: UserState = {
  data: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
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
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { resetBankState } = userSlice.actions;
export default userSlice.reducer;
