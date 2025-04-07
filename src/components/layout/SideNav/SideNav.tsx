"use client";
import React, { useState } from "react";
import {
  ColoredFolder,
  ColoredInvoice,
  ColoredLink,
  ColoredStore,
} from "../../../../public/icons/iconsExport";
import SideNavHoverPopUp from "./SideNavHoverPopUp";

const SideNav = () => {
  const [hoverPopup, setHoverPopup] = useState("");
  const buttons = [
    {
      name: "Link in Bio",
      icon: <ColoredLink className="h-[23px] w-[23px]" />,
    },
    {
      name: "Store",
      icon: <ColoredStore className="h-[23px] w-[23px]" />,
    },
    {
      name: "Media Kit",
      icon: <ColoredFolder className="h-[23px] w-[23px]" />,
    },
    {
      name: "Invoicing",
      icon: <ColoredInvoice className="h-[23px] w-[23px]" />,
    },
  ];

  return (
    <div className="fixed top-60 left-3 h-fit rounded-full flex flex-col gap-2 bg-white z-50 shadow-lg p-1 transition-all duration-500 ease-in-out">
      {buttons.map((button) => (
        <div
          key={button.name}
          onMouseEnter={() => setHoverPopup(button.name)}
          onMouseLeave={() => setHoverPopup("")}
          className="relative rounded-full hover:bg-gray-100 grayscale hover:grayscale-0 cursor-pointer p-2 flex items-center justify-center"
        >
          {button.icon}
          {hoverPopup === button.name && (
            <SideNavHoverPopUp text={button.name} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SideNav;
