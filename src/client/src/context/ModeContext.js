import React, { createContext, useContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

export const ModeContext = createContext();

export function useMode() {
  return useContext(ModeContext);
}

export const ModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  const defaultHistory = [];
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <ModeContext.Provider value={{ darkMode, toggleDarkMode, searchHistory, setSearchHistory }}>
      {children}
    </ModeContext.Provider>
  );
};
