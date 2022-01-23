import Splash from "./pages/Splash/Splash";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import {BrowserRouter, Routes, Route, } from 'react-router-dom';
import About from "./pages/About";
import { Nav } from "./components/AppBar/AppBar";
import React from "react";
import Stayers from "./pages/Stayers/Stayers";
import Hosts from "./pages/Hosts/Hosts";
import Directory from "./pages/Directory/Directory";
import Footer from "./components/Footer";
import Dashboard from "./pages/cms/Dashboard.";
import { ThemeProvider } from "@mui/styles";
import { theme } from "./Theme";
import { GlobalStore } from "./GlobalStore";

function App() {
  return (
    <GlobalStore>
      <BrowserRouter>
        <div>  
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/splash" element={<Splash />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/sign_up" element={<SignUp />}/>
            <Route path="/about" element={<About />} />
            <Route path="/stayers" element={<Stayers />}/>
            <Route path="/hosts" element={<Hosts />}/>
            <Route path="/search" element={<Directory />}/>
            <Route path="/cms/dashboard" element={<Dashboard />}/>
          </Routes>
          
        </div>
      </BrowserRouter>
    </GlobalStore>

  );
}

export default App;
