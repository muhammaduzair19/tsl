import { LogOut, SquareMenu } from "lucide-react";
import React from "react";
import { useAppContext } from "../context/context";

const Navbar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useAppContext();
    return (
        <div className="w-full py-4 px-4  bg-white text-black">
            <nav className="w-full flex justify-between">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <SquareMenu />
                </button>
                <span>
                    <LogOut />
                </span>
            </nav>
        </div>
    );
};

export default Navbar;
