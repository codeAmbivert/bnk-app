import React from "react";

const SideNavHoverPopUp = ({ text }: { text: string }) => {
  return (
    <div className="absolute left-14">
      <div className="relative py-3 px-4 bg-black text-white whitespace-nowrap rounded-lg">
        {text}
        <div className="h-3 w-3 rotate-45 absolute top-1/2 -translate-y-1/2 -left-1 bg-black" />
      </div>
    </div>
  );
};

export default SideNavHoverPopUp;
