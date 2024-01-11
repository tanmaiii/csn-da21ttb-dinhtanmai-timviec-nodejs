import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { makeRequest } from "../axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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

  // Đăng nhập nhà tuyển dụng
  const loginCompany = async (inputs) => {
    setCurrentUser(null);
    localStorage.setItem("user", null);
    const res = await makeRequest.post("/authCompany/login", inputs);
    setCurrentCompany(res.data);
  };

  // Đăng xuất nhà tuyển dụng
  const logoutCompany = async () => {
    await makeRequest.post("/authCompany/logout");
    setCurrentCompany(null);
    navigate("/");
  };

  //Đăng nhập người tìm việc
  const loginUser = async (inputs) => {
    setCurrentCompany(null);
    localStorage.setItem("company", null);
    const res = await makeRequest.post("/authUser/login", inputs);
    setCurrentUser(res.data);
  };

  //Đăng xuất người tìm việc
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

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await makeRequest.get("/user/owner");
        setCurrentUser(res.data);
      } catch (error) {
        setCurrentUser(null);
      }
    };
    currentUser && getInfo();
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await makeRequest.get("/company/owner");
        setCurrentCompany(res.data);
      } catch (error) {
        setCurrentCompany(null);
      }
    };
    currentCompany && getInfo();
  }, []);

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
