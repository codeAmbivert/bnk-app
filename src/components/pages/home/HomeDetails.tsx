"use client";
import { useEffect } from "react";
import WalletComp from "./Wallet/WalletComp";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { getUserWallet } from "../../../../redux/slices/walletSlice";
import TransactionsTable from "./Transactions/TransactionsTable";

const HomeDetails = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.wallet);

  useEffect(() => {
      dispatch(getUserWallet());
  }, []);
  return (
    <div className="pt-20 p-3">
      <div className="max-w-[1159px] w-full mx-auto flex flex-col gap-10">
        <WalletComp walletData={data} />
        <TransactionsTable />
      </div>
    </div>
  );
};

export default HomeDetails;
