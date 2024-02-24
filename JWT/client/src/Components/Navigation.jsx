import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: blue; /* Add your desired styles here */
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24;
  padding-right: 24;
  width: 100%;
`;
const Div = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Navigation = () => {
  return (
    <div>
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <Div>
          <StyledLink to="/register">Register</StyledLink>
          <StyledLink to="/login">Login</StyledLink>
        </Div>
      </Nav>
    </div>
  );
};

export default Navigation;
