import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/context";
import clsx from "clsx";

const AppLayout = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useAppContext();

    return (
        <div className="w-full h-screen bg-gradient-to-tr from-gray-100 to-gray-50 text-black flex overflow-hidden">
            <Sidebar />
            <div
                className={clsx(
                    "w-full min-h-screen flex flex-col transition-all duration-500",
                    isSidebarOpen ? "md:pl-72" : "md:pl-16 pl-0"
                )}
            >
                <Navbar />
                <main className="w-full min-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
