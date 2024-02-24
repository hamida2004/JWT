
import React from "react";
import styled from 'styled-components'


const Navbar = styled.div`
background-color: red;

background-color: white;
 height : 8vh;
 width : 100%;
`
const Anchor = styled.a`
color :#2a1091;
font-size: 25px;
cursor: pointer;
text-decoration : none
`
const NavUl= styled.ul`
  list-style: none;
  text-decoration : none;
display : flex ;
align-items : center;
justify-content : space-between;
padding : 15px`
const Nav = (props)=>{
   
    
    return <Navbar>
          <NavUl>
           <li> <Anchor >home</Anchor></li>
            {props.loggedIn && <Anchor>logout</Anchor>}
        </NavUl>
    </Navbar>
}

export default Nav