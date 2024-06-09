//import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Rides from "../pages/Rides";
import Drivers from "../pages/Drivers";
import ProtectedRoute from "./ProtectedRoutes";
import { Box } from "@chakra-ui/react";
import CreateRide from "../pages/CreateRide";
import Landing from "../pages/Landing";
import History from "../pages/History";

function AppNavigation() {
  return (
    <Box
      styles={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/drivers"
            element={
              <ProtectedRoute>
                <Drivers />
              </ProtectedRoute>
            }
          />
          <Route path="/create-ride" element={<CreateRide />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppNavigation;
