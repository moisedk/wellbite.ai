import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import UserMain from "./userMain";
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route index element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/dashboard" element={<UserMain/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
