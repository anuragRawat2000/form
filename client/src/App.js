import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <Route exact path="/">
        <Navbar />
        <Home />
      </Route>
      <Route exact path="/login">
        <Navbar />
        <Login />
      </Route>
      <Route exact path="/about">
        <Navbar />
        <About />
      </Route>
      <Route exact path="/signup">
        <Navbar />
        <Signup />
      </Route>
    </div>
  );
}

export default App;
