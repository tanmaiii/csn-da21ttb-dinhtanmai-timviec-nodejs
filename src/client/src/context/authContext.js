import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { makeRequest } from "../axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));

  const [currentCompany, setCurrentCompany] = useState(
    JSON.parse(localStorage.getItem("company") || null)
  );

  const loginCompany = async (inputs) => {
    setCurrentUser(null);
    localStorage.setItem("user", null);
    const res = await makeRequest.post("/authCompany/login", inputs);
    setCurrentCompany(res.data);
  };

  const logoutCompany = async () => {
    await makeRequest.post("/authCompany/logout");
    setCurrentCompany(null);
    navigate("/");
  };

  const loginUser = async (inputs) => {
    setCurrentCompany(null);
    localStorage.setItem("company", null);
    const res = await makeRequest.post("/authUser/login", inputs);
    setCurrentUser(res.data);
  };

  const logoutUser = async () => {
    await makeRequest.post("/authUser/logout");
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("company", JSON.stringify(currentCompany));
  }, [currentCompany]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        setCurrentUser,
        currentUser,
        loginUser,
        logoutUser,
        currentCompany,
        setCurrentCompany,
        loginCompany,
        logoutCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
