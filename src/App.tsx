import React from "react";
import { FC } from "react";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Table";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<SignUp/>}/>
              <Route path="/login" element={<LogIn/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
  );
};
export default App;
