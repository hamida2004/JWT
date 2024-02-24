import { useState } from "react";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import styled from "styled-components";
import Navigation from "./Components/Navigation.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Protected from "./Components/Protected.jsx";
import Home from "./Components/Home.jsx";

const Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

function App() {

  return (
    <Router>
        <Navigation />
      <Div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/protected" element={<Protected />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Div>
    </Router>
  );
}

export default App;
