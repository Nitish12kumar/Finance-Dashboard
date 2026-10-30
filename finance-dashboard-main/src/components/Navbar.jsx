import React from "react";

const Navbar = ({ role, setRole }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/20 px-6 py-4 flex justify-between items-center">

      {/* Logo Only */}
      <div className="flex items-center  h-16 gap-3">
        <img
          src="/logo.png"
          alt="logo"
          className="w-14 h-14 object-contain scale-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]"
        />
          <h1 className="text-3xl font-semibold text-white tracking-wide">
    Finance Dashboard
  </h1>
      </div>

      {/* Role Dropdown */}
      <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="bg-white/10 backdrop-blur-md text-green-300 border border-white/20 px-3 py-1 rounded-md focus:outline-none"
>
  <option className="bg-black text-white" value="viewer">
    Viewer
  </option>
  <option className="bg-black text-white" value="admin">
    Admin
  </option>
</select>
    </div>
  );
};

export default Navbar;