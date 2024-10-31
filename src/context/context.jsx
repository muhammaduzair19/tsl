import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const values = { isSidebarOpen, setIsSidebarOpen };
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};


export const useAppContext = () => useContext(AppContext)


export default AppContextProvider;