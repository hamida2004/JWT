import React, { useState } from "react";
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
  height: 100% ;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
const Permission = (props) => {
  const roles = props.roles ;
  console.log(roles);
  return (
    <div>
      <Nav>
        <Div>
            <h1>hello customer</h1>
            {roles.includes('000') && <StyledLink to="/Gestion">admin</StyledLink> }
            {roles.includes('004') &&<StyledLink to="/Dg">directeur general</StyledLink>}
            {roles.includes('005') &&<StyledLink to="/Ddrct">directeur direct</StyledLink>}
            {roles.includes('002') &&<StyledLink to="/Mg">magasinier</StyledLink>}
        </Div>
      </Nav>
    </div>
  );
};

export default Permission;
