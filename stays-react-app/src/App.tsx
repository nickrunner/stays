import Splash from "./Splash";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {BrowserRouter, Routes, Route, } from 'react-router-dom';
import About from "./About";
import { Nav } from "./AppBar";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />     
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />}/>
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
