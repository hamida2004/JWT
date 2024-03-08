import { useState } from "react";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import styled from "styled-components";
import Navigation from "./Components/Navigation.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Protected from "./Components/Protected.jsx";
import Home from "./Components/Home.jsx";
import Gestion from "./Components/Gestion.jsx";
import Dg from "./Components/Dg.jsx";
import Ddrct from './Components/Ddrct.jsx';
import Mg from "./Components/Mg.jsx";



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

          <Route path="/Dg" element={<Dg />} />
          <Route path="/Ddrct" element={<Ddrct />} />
          <Route path="/Mg" element={<Mg />} />
          <Route path="/Gestion" element={<Gestion/>} />
        </Routes>
      </Div>
    </Router>
  );
}

export default App;
