import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import UserMain from "./userMain";
import DoctorSignup from "./DoctorSignup";
import Login from "./Login";


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route index element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/dashboard" element={<UserMain/>}/>
    <Route path="/docsignup" element={<DoctorSignup/>}/>
    <Route path="/doclogin" element={<Login/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
