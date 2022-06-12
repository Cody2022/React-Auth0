
import "./App.css";
import {Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import Profile from "./components/Profile";
import EditRole from "./components/EditRole";
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "./components/Home";
import Enter from "./components/Enter";
import { Newcomer } from "./components/Newcomer";
import { Volunteer } from "./components/Volunteer";
import { Admin } from "./components/Admin";



function App() {
  const {user,isAuthenticated} = useAuth0();
  return (
    <div className="">
        <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/enter" element={<Enter />} />
        <Route path="/newcomer" element={<Newcomer />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
  </div>
  );
}

export default App;
