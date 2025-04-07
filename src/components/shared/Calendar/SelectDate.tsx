"use client";
import dayjs from "dayjs";
import Calendar from "./Calendar";
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from "../../../../public/icons/iconsExport";

interface SelectDateProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const SelectDate = ({
  isOpen,
  setIsOpen,
  selectedDate,
  setSelectedDate,
}: SelectDateProps) => {
  return (
    <div className="w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "bg-white border-2" : "bg-[#EFF1F6]"
        } rounded-xl flex items-center justify-between h-[44px] w-full px-4 cursor-pointer text-sm gap-2 relative`}
      >
        {selectedDate ? dayjs(selectedDate).format("D MMM YYYY") : "SelectDate"}
        {isOpen ? (
          <ArrowUpIcon className="h-[5.02px] w-[8.83px] text-[#31373D]" />
        ) : (
          <ArrowDownIcon className="h-[5.02px] w-[8.83px] text-[#31373D]" />
        )}
        {isOpen && <div className="h-full w-full absolute top-0 left-0" />}
      </div>
      {isOpen && (
        <Calendar
          onClose={() => setIsOpen(false)}
          onChange={(value) => {
            setSelectedDate(value);
          }}
        />
      )}
    </div>
  );
};

export default SelectDate;
