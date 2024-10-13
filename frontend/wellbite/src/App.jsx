import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import UserMain from "./userMain";
import DoctorSignup from "./DoctorSignup";
import Login from "./login";
import PatientProfile from "./patientProfile";
import PrivateRoute from "./privateRoute";
import PrivateRouteDoctor from "./privateRouteDoctor";
import PrivateRoutePatient from "./privateRoutePatient";
import DoctorDashboard from "./DoctorDashboard";
import PatientSignup from "./patientSignUp";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route index element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/dashboard" element={<PrivateRoute><PrivateRoutePatient><UserMain/></PrivateRoutePatient></PrivateRoute>}/>
    <Route path="/docsignup" element={<DoctorSignup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/patients" element={<PrivateRoute><PrivateRouteDoctor><DoctorDashboard/></PrivateRouteDoctor></PrivateRoute>}/>
    <Route path="/profile" element={<PrivateRoute><PrivateRoutePatient><PatientProfile/></PrivateRoutePatient></PrivateRoute>}/>
    <Route path="/patient-signup" element={<PatientSignup/>}/>
   </Routes>

   </BrowserRouter>
  );
}

export default App;
