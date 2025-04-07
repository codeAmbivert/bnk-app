"use client";
import { Button } from "@/components/shared/Button";
import { CloseIcon } from "../../../../../public/icons/iconsExport";
import { useState } from "react";
// import Calendar from "@/components/shared/Calendar";
import SelectDate from "@/components/shared/Calendar/SelectDate";
import MultipleSelectDropDown from "@/components/shared/MultipleSelectDropDown";
// import Calendar from "@/components/shared/Calendar";

interface FilterProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const FilterModal = ({ isOpen, setIsOpen }: FilterProps) => {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [openTransactionType, setOpenTransactionType] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    string[]
  >([]);
  const [openTransactionStatus, setOpenTransactionStatus] = useState(false);
  const [selectedTransactionStatus, setSelectedTransactionStatus] = useState<
    string[]
  >([]);

  const transactionTypes = [
    { label: "Store Trransactions", value: "store_transactions" },
    { label: "Get Tipped", value: "get_tipped" },
    { label: "Withdrawals", value: "withdrawals" },
    { label: "Chargebacks", value: "charge_backs" },
    { label: "Cashbacks", value: "cash_backs" },
    { label: "Refer & Earn", value: "refer_and_earn" },
  ];
  const transactionStatus = [
    { label: "Successful", value: "successful" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
  ];

  const buttons = [
    { name: "Today", value: "today" },
    { name: "Last 7 days", value: "last_7_week" },
    { name: "This Month", value: "this_month" },
    { name: "Last 3 Monts", value: "last_3_monts" },
  ];
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed top-0 left-0 w-full h-full z-[100]"
          style={{ background: "rgba(225, 225, 225, 0.5)" }}
        />
      )}
      <div
        className={` fixed top-3 right-3 transition-all duration-500 max-w-[300px] md:max-w-[450px] w-full z-[200] ${
          isOpen ? "translate-x-0" : "translate-x-[1000px]"
        }`}
      >
        <div
          className={`h-[95vh] bg-white w-full relative overflow-hidden shadow-md rounded-xl p-5`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[24px] font-bold">Filter</p>
            <div
              onClick={handleClose}
              className="flex justify-center items-center h-[24px] w-[24px] rounded-full hover:bg-[#EFF1F6] cursor-pointer"
            >
              <CloseIcon className="h-[12.6px] w-[12.6px]" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 mt-5">
            {buttons.map((button) => (
              <Button
                key={button.value}
                variant="outline"
                size="fit"
                className="whitespace-nowrap font-semibold text-xs"
              >
                {button.name}
              </Button>
            ))}
          </div>
          <div className="mt-5">
            <p className="font-medium mb-1">Date Range</p>

            <div className="flex gap-3 w-full relative">
              <SelectDate
                isOpen={openStartDate}
                setIsOpen={setOpenStartDate}
                selectedDate={startDate}
                setSelectedDate={setStartDate}
              />
              <SelectDate
                isOpen={openEndDate}
                setIsOpen={setOpenEndDate}
                selectedDate={endDate}
                setSelectedDate={setEndDate}
              />
            </div>
            <div className="mt-5">
              <p className="font-medium mb-1">Transaction Type</p>
              <MultipleSelectDropDown
                isOpen={openTransactionType}
                setIsOpen={setOpenTransactionType}
                selected={selectedTransactionType}
                setSelected={setSelectedTransactionType}
                items={transactionTypes}
              />
            </div>

            <div className="mt-5">
              <p className="font-medium mb-1">Transaction Status</p>
              <MultipleSelectDropDown
                isOpen={openTransactionStatus}
                setIsOpen={setOpenTransactionStatus}
                selected={selectedTransactionStatus}
                setSelected={setSelectedTransactionStatus}
                items={transactionStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
