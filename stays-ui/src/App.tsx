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
import Account from "./pages/Account/Account";
import PremiumSignUp from "./pages/Stayers/PremiumSignUp";
import HostPortal from "./pages/Hosts/HostPortal";
import UsersCms from "./pages/cms/Users/UsersCms";
import StaysCms from "./pages/cms/Stays/StaysCms";
import ContentCms from "./pages/cms/Content/ContentCms";
import AddStaysCms from "./pages/cms/Stays/AddStaysCms";
import StayAttributesCms from "./pages/cms/StayAttributes/StayAttributesCms";
import { StayAttributeType } from "./models/StayAttributes";

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
            <Route path="/stayers/premium/sign_up" element={<PremiumSignUp />}/>
            <Route path="/hosts" element={<Hosts />}/>
            <Route path="/hosts/portal" element={<HostPortal />}/>
            <Route path="/directory" element={<Directory />}/>
            <Route path="/account" element={<Account />}/>
            <Route path="/cms/dashboard" element={<Dashboard />}/>
            <Route path="/cms/users" element={<UsersCms />}/>
            <Route path="/cms/stays" element={<StaysCms />}/>
            <Route path="/cms/amenities" element={<StayAttributesCms type={StayAttributeType.Amenity} />}/>
            <Route path="/cms/property_types" element={<StayAttributesCms type={StayAttributeType.PropertyType} />}/>
            <Route path="/cms/special_interests" element={<StayAttributesCms type={StayAttributeType.SpecialInterest} />}/>
            <Route path="/cms/stays/add" element={<AddStaysCms />}/>
            <Route path="/cms/content" element={<ContentCms />}/>
          </Routes>
          
        </div>
      </BrowserRouter>
    </GlobalStore>

  );
}

export default App;
