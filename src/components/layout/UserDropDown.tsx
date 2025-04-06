import {
  AppsIcon,
  GiftIcon,
  ReceiptIcon,
  SettingsIcon,
  SignOutIcon,
  SwitchUserIcon,
} from "../../../public/icons/iconsExport";
import { UserData } from "../../../redux/slices/userSlice";

interface UserDropDownProps {
  data: UserData | null;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const UserDropDown = ({ data, isOpen, setIsOpen }: UserDropDownProps) => {
  const buttons = [
    { name: "Settings", icon: SettingsIcon },
    { name: "Purchase History", icon: ReceiptIcon },
    { name: "Refer and Earn", icon: GiftIcon },
    { name: "Integration", icon: AppsIcon },
    { name: "Switch Account", icon: SwitchUserIcon },
    { name: "Sign Out", icon: SignOutIcon },
  ];

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed top-0 left-0 w-full h-full bg-transparent z-[100]"
        />
      )}
      <div
        className={` fixed top-[85px] right-5 transition-all duration-500 max-w-[350px] w-full z-[200] ${
          isOpen
            ? "translate-x-0 translate-y-0"
            : "translate-x-[1000px] translate-y-[1000px]"
        }`}
      >
        <div
          className={`h-fit bg-white w-full relative overflow-hidden shadow-md rounded-xl p-5`}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center bg-[#131316] h-[40px] w-[40px] text-[14px] text-white rounded-full">
              {data?.first_name?.charAt(0).toUpperCase() ?? "U"}
              {data?.last_name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <div className="flex flex-col ml-3">
              <span className="text-lg font-semibold">
                {data?.first_name} {data?.last_name}
              </span>
              <span className="text-[13px] text-[#56616B] font-medium">
                {data?.email}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            {buttons.map((button) => (
              <div
                key={button.icon}
                className="flex items-center gap-3 cursor-pointer hover:bg-[#F9FAFB] p-2 rounded-md"
              >
                <button.icon className="h-[14px] w-[14px]" />
                <span className="text-[#131316] text-[15px] font-semibold">
                  {button.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDropDown;
