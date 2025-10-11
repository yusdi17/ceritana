import React from 'react'
import { Link } from 'react-router-dom';
import SidebarItem from './SidebarItem';
export default function Sidebar({ isAdmin = true }) {
    return (
        <aside className="sidebar-container fixed h-[calc(100vh-20px)] w-full max-w-[280px] my-[10px] ml-[10px] bg-[#060A23] overflow-hidden flex flex-1 rounded-[20px]">
            <div className="scroll-container flex w-full overflow-y-scroll hide-scrollbar">
                <nav className="flex flex-col w-full h-fit p-[30px] gap-10 z-10">
                    <span className="font-semibold text-white text-3xl">Ceritana.id</span>
                    <ul className="flex flex-col gap-4">
                        <p className="font-semibold text-xs leading-[18px] text-white">GENERAL</p>
                        <SidebarItem
                            to="/dashboard"
                            end
                            label="Overview"
                            icon="/assets/images/icons/3dcube-white.svg"
                        />
                        {isAdmin && (
                            <>
                                <SidebarItem
                                    to="/dashboard/cerita"
                                    label="Cerita"
                                    icon="/assets/images/icons/note-favorite-white.svg"
                                />
                                <SidebarItem
                                    to="/dashboard/provinsi"
                                    label="Provinsi"
                                    icon="/assets/images/icons/crown-white.svg"
                                />
                            </>
                        )}
                    </ul>
                    <ul className="flex flex-col gap-4">
                        <p className="font-semibold text-xs leading-[18px] text-white">OTHERS</p>
                        <SidebarItem
                            to="/dashboard/manage-users"
                            label="Manage Users"
                            icon="/assets/images/icons/profile-2user-white.svg"
                        />
                    </ul>
                </nav>
            </div>
            <img src="/assets/images/backgrounds/sidebar-glow.png" className="absolute object-contain object-bottom bottom-0" alt="background" />
        </aside>
    )
}
