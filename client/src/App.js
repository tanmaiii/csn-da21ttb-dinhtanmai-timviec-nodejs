import { Route, BrowserRouter, Routes } from "react-router-dom";
import './assets/libs/boxicons-2.1.4/css/boxicons.min.css'
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import AuthUser from "./pages/authUser/AuthUser";
import { useState } from "react";
import './App.scss'


function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <div className={`App`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>} />
            </Route>
            <Route path="/authUser" element={AuthUser} />
            <Route path="/authUser" element={AuthUser} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
