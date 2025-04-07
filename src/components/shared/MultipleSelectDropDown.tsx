import React, { useEffect, useRef } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../../../public/icons/iconsExport";

interface MultipleSelectDropDownProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  selected: string[];
  setSelected: (value: string[]) => void;
  items: { label: string; value: string }[];
}

const MultipleSelectDropDown = ({
  isOpen,
  setIsOpen,
  selected,
  setSelected,
  items,
}: MultipleSelectDropDownProps) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-full relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "bg-white border-2" : "bg-[#EFF1F6]"
        } rounded-xl flex items-center justify-between h-[44px] w-full px-4 cursor-pointer text-sm gap-2 relative`}
      >
        {selected.length > 0 ? selected.join(", ") : "Select an item"}
        {isOpen ? (
          <ArrowUpIcon height={10} width={15} />
        ) : (
          <ArrowDownIcon className="h-[5.02px] w-[8.83px] text-[#31373D]" />
        )}
        {isOpen && <div className="h-full w-full absolute top-0 left-0" />}
      </div>
      {isOpen && (
        <div
          ref={selectRef}
          className="bg-white rounded-xl shadow-lg p-4 w-full absolute top-full mt-1 left-0 z-[100] flex flex-col gap-5"
        >
          {items.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                if (selected.includes(item.label)) {
                  setSelected(selected.filter((i) => i !== item.label));
                } else {
                  setSelected([...selected, item.label]);
                }
              }}
              className={`flex items-center gap-2 cursor-pointer`}
            >
              <input
                type="checkbox"
                className="accent-black"
                checked={selected.includes(item.label)}
              />{" "}
              <span className="mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleSelectDropDown;
