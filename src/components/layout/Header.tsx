"use client";
import { useEffect, useState } from "react";
import {
  AnalyticsIcon,
  AppsIcon,
  BellIcon,
  ChatIcon,
  CrmIcon,
  HomeIcon,
  Logo,
  MenuIcon,
  RevenueIcon,
} from "../../../public/icons/iconsExport";
import { Button } from "../shared/Button";
import UserDropDown from "./UserDropDown";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getUser } from "../../../redux/slices/userSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.user);
  const [openUserDropDown, setOpenUserDropDown] = useState(false);
  const buttons = [
    { name: "Home", icon: HomeIcon },
    { name: "Analytics", icon: AnalyticsIcon },
    { name: "Revenue", icon: RevenueIcon },
    { name: "CRM", icon: CrmIcon },
    { name: "Apps", icon: AppsIcon },
  ];

  console.log("user data", data);

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full p-3 pb-0 bg-white z-100">
      <div className="w-full bg-white rounded-full shadow h-[64px] flex justify-between items-center pl-6 pr-4">
        <Logo className="h-[36px] w-[36px] cursor-pointer" />
        <div className="flex items-center gap-4">
          {buttons.map((button) => (
            <Button
              key={button.icon}
              icon={<button.icon className="h-[14px] w-[14px]" />}
              className={`${
                button.name === "Revenue"
                  ? "bg-[#131316] text-white hover:bg-[#131316]"
                  : "text-[#56616B]"
              } text-sm`}
            >
              <span className="flex items-center pt-1">{button.name}</span>
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <BellIcon className="h-[15.99px] w-[12.45px] cursor-pointer" />
          <ChatIcon className="h-[14.40px] w-[15.83px] cursor-pointer" />
          <div
            onClick={() => setOpenUserDropDown(true)}
            className="p-1 bg-[#EFF1F6] rounded-full flex items-center gap-2 cursor-pointer pr-3"
          >
            <div className="flex items-center justify-center bg-[#131316] h-[32px] w-[32px] text-[14px] text-white rounded-full">
              {data?.first_name?.charAt(0).toUpperCase() ?? "U"}
              {data?.last_name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <MenuIcon className="h-[10.55px] w-[17px] cursor-pointer" />
          </div>
        </div>
      </div>
      <UserDropDown
        data={data}
        isOpen={openUserDropDown}
        setIsOpen={setOpenUserDropDown}
      />
    </div>
  );
};

export default Header;
