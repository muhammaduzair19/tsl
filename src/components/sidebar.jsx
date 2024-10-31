import React from "react";
import { useAppContext } from "../context/context";
import { ClipboardPen, NotebookText, SquareMenu } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useAppContext();
    return (
        <div
            className={`${
                isSidebarOpen ? "w-72" : "w-0 md:w-16"
            } h-full fixed  transition-all z-20 top-0 bottom-0 left-0 duration-300 bg-white text-black  md:border-r-[0.5px] border-gray-100 overflow-hidden`}
        >
            <div className="w-full h-full">
                <div className="flex flex-col py-4">
                    <div className="flex justify-between w-full items-center px-4 ">
                        <h1 className=" font-extrabold text-xl md:self-center">
                            BLS
                        </h1>

                        <button className="md:hidden">
                            <SquareMenu
                                onClick={() => setIsSidebarOpen(false)}
                            />
                        </button>
                    </div>
                    <div className="mt-10 flex flex-col gap-8">
                        <SidebarLink
                            link="/book"
                            icon={NotebookText}
                            label="Book Appointment"
                        />
                        <SidebarLink
                            link="/available"
                            icon={ClipboardPen}
                            label="Available Appointment"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

const SidebarLink = ({ link, label, icon: Icon }) => (
    <NavLink
        to={link}
        className="w-full hover:bg-yellow-400/80 hover:text-black overflow-hidden py-2 px-4"
    >
        <div className="flex items-center gap-4 ">
            <span>
                <Icon strokeWidth={1} size={25} />
            </span>
            <p className="text-base font-medium ml-2">{label}</p>
        </div>
    </NavLink>
);
