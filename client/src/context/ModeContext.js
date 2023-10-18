import React, { createContext, useContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

export const ModeContext = createContext();

export function useMode() {
  return useContext(ModeContext);
}

export const  ModeContextProvider = ({ children }) =>{
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode") || false)
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <ModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ModeContext.Provider>
  );
}
