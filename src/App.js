import React from "react";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Collection from "./pages/Collection";
import AddPost from "./pages/AddPost";
import "@/assets/styles/App.css";


import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} index />
        <Route exact path="/post/:id" element={<Post />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/editprofile" element={<EditProfile />} />
        <Route exact path="/collection" element={<Collection />} />
        <Route exact path="/addpost" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
