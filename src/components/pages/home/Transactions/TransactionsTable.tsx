import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { getUserTransactions } from "../../../../../redux/slices/transactionsSlice";
import {
  ArrowDownIcon,
  BrokenIcon,
  DownloadIcon,
  IncomingArrowIcon,
  OutgoingArrowIcon,
} from "../../../../../public/icons/iconsExport";
import { Button } from "@/components/shared/Button";
import { currencyFormatter } from "@/helpers/utils";
import dayjs from "dayjs";
import FilterModal from "./FilterModal";

const TransactionsTable = () => {
  const dispatch = useAppDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const { data } = useAppSelector((state) => state.transactions);

  console.log("transaction data", data);

  useEffect(() => {
    dispatch(getUserTransactions());
  }, []);

  if (!data) {
    return (
      <div className="h-40 w-full flex justify-center items-center border">
        <div className="flex flex-col items-center">
          <BrokenIcon className="h-20 w-20" />
          <p className="text-xl font-bold">No Transactions Yet</p>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex justify-between items-center gap-5 flex-wrap py-5 border-b border-[#EFF1F6]">
        <div className="flex flex-col">
          <div className="text-[28px] font-bold">
            {data?.length} Transactions
          </div>
          <p className="text-[15px] font-medium text-[#56616b] -mt-2">
            Your Transactions for All Time
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setOpenFilter(!openFilter)}
            endIcon={<ArrowDownIcon className="h-[6.02px] w-[10.68px]" />}
            className="bg-[#EFF1F6] cursor-pointer"
          >
            <div className="text-[15px] flex items-center gap-2 font-medium">
              Filter
              <div className="h-[20px] w-[20px] rounded-full bg-black text-white flex justify-center items-center text-xs">
                3
              </div>
            </div>
          </Button>
          <Button
            endIcon={<DownloadIcon className="h-[11.96px] w-[11.67px]" />}
            className="bg-[#EFF1F6] cursor-pointer"
          >
            <div className="text-[15px] flex items-center gap-2 font-medium">
              Export list
            </div>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 pt-8 py-10">
        {Array.isArray(data) &&
          data?.map((transaction, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div
                  className={`h-[48px] w-[48px] flex justify-center items-center rounded-full ${
                    transaction?.type === "deposit"
                      ? "bg-[#E3FCF2]"
                      : "bg-[#F9E3E0]"
                  }`}
                >
                  {transaction?.type === "deposit" ? (
                    <IncomingArrowIcon className="h-[11.5px] w-[11.5px]" />
                  ) : (
                    <OutgoingArrowIcon className="h-[11.5px] w-[11.5px]" />
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="capitalize font-medium">
                    {transaction?.metadata?.product_name ||
                      transaction?.metadata?.type ||
                      "No product name"}
                  </p>
                  <p className="text-[14px] text-[#56616B] font-medium">
                    {transaction?.metadata?.name || "Lagbaja"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-bold">
                  USD {currencyFormatter(transaction?.amount ?? 0)}
                </p>
                <p className="text-[14px] text-[#56616B] font-medium">
                  {dayjs(transaction?.date).format("MMM D, YYYY")}
                </p>
              </div>
            </div>
          ))}
      </div>
      <FilterModal isOpen={openFilter} setIsOpen={setOpenFilter} />
    </div>
  );
};

export default TransactionsTable;
