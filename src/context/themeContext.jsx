import React, { createContext, useContext, useState } from "react";

export const themeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [WebsiteTheme, setWebsiteTheme] = useState("dark")
    return (
        <themeContext.Provider value={{WebsiteTheme, setWebsiteTheme}}>
            {children}
        </themeContext.Provider>
    )
}