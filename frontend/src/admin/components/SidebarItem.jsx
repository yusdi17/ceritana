import React from 'react'
import { NavLink } from 'react-router-dom';
export default function SidebarItem({ to, label, icon, end = false }) {
  const base =
    "flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300";
  const active =
    "bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]";
  const inactive =
    "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset] hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset]";

  return (
    <li>
      <NavLink
        to={to}
        end={end} // pakai end untuk match exact (mis. Overview)
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <img src={icon} className="w-6 h-6" alt="icon" />
        <span className="font-semibold text-white">{label}</span>
      </NavLink>
    </li>
  );
}
