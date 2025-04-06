import { Button } from "@/components/shared/Button";
import { CloseIcon } from "../../../../../public/icons/iconsExport";

interface FilterProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const FilterModal = ({ isOpen, setIsOpen }: FilterProps) => {
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
        className={` fixed top-3 right-3 transition-all duration-500 max-w-[450px] w-full z-[200] ${
          isOpen ? "translate-x-0" : "translate-x-[1000px]"
        }`}
      >
        <div
          className={`h-fit bg-white w-full relative overflow-hidden shadow-md rounded-xl p-5`}
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
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
