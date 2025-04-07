import React, { useEffect, useRef, useState } from "react";
import { Button } from "../shared/Button";
import {
  AppsIcon,
  AppsIcon2,
  ArrowDownIcon,
  ArrowRight,
  ColoredFolder,
  ColoredInvoice,
  ColoredLink,
  ColoredStore,
} from "../../../public/icons/iconsExport";

const AppsBtn = () => {
  const [selected, setSelected] = useState("Link in Bio");
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);

  const buttons = [
    {
      name: "Link in Bio",
      desc: "Manage your Link in Bio",
      icon: <ColoredLink className="h-[23px] w-[23px]" />,
    },
    {
      name: "Store",
      desc: "Manage your Store activities",
      icon: <ColoredStore className="h-[23px] w-[23px]" />,
    },
    {
      name: "Media Kit",
      desc: "Manage your Media Kit",
      icon: <ColoredFolder className="h-[23px] w-[23px]" />,
    },
    {
      name: "Invoicing",
      desc: "Manage your Invoices",
      icon: <ColoredInvoice className="h-[23px] w-[23px]" />,
    },
  ];
  
    const handleClickOutside = (event: MouseEvent) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <div>
      {!open ? (
        <Button
          onClick={() => setOpen(!open)}
          icon={<AppsIcon className="h-[14px] w-[14px]" />}
          className={`text-[#56616B] text-sm`}
        >
          <span className="flex items-center pt-1">Apps</span>
        </Button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="h-[40px] w-fit px-4 bg-[#131316] rounded-full text-white flex relative"
          >
            <div className="border-r border-white pr-4 flex items-center gap-2">
              <AppsIcon2 className="h-[14px] w-[14px]" />
              Apps
            </div>
            <div className="border-[#56616B] pl-4 flex items-center gap-2">
              {selected}
              <ArrowDownIcon className="h-[14px] w-[14px]" />
            </div>
            {open && <div className="h-full w-full absolute top-0 left-0" />}
          </button>
          <div ref={btnRef} className="absolute left-0 top-full mt-4 bg-white rounded-xl shadow-lg p-3 flex flex-col gap-1 w-[350px]">
            {buttons.map((button) => (
              <div
                key={button.name}
                onClick={() => {
                  setSelected(button.name);
                  setOpen(false);
                }}
                className={`group rounded-xl flex items-center gap-2 p-3 cursor-pointer hover:border hover:border-gray-200 hover:shadow justify-between`}
              >
                <div className="flex gap-3">
                  <div className="p-3 border border-gray-200 rounded-xl">
                    {button.icon}
                  </div>
                  <div className="flex flex-col group-hover:scale-110 transition-all duration-300 ease-in-out">
                    <p>{button.name}</p>
                    <p className="text-sm text-[#56616b]">{button.desc}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppsBtn;
