import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Sign-up";
import Sell from "./pages/Sell";
import Buy from "./pages/buy"; 

const App = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buy" element={<Buy />} />
      </Routes>
    </Router>
  );
};

export default App;
