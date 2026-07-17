import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">

      <h1 className="text-2xl font-bold">
        Admin Panel
      </h1>

      <button className="bg-black text-white px-5 py-2 rounded-full text-xs md:text-sm">
        Logout
      </button>

    </div>
  );
};

export default Navbar;