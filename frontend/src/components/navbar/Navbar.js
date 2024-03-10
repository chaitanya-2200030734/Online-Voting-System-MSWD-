import React, { useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import styled from 'styled-components'

const Navbar = () => {
const history =useHistory();
const logout=async(e)=>{
e.preventDefault();

    const logo = await fetch('/logout' , {
        method: 'GET'
    });
    if(logo.status === 200){
        alert('Successfully logged out')
    }
    if(logo.status === 400){
        alert('Please login to log out :)');
        history.push('/signin')
    }

}


  return(
        <Container >

            <MidCont>
                <img src="image.png" alt="" />
            </MidCont>
            <RightSide>
                
           

<div className="home"><NavLink exact activeClassName = "active" to="/">Home</NavLink></div>
<div className="vote"><NavLink exact activeClassName = "active" to="/vote">Vote</NavLink></div>
<div className="register"><NavLink exact activeClassName = "active" to="/signup">Register</NavLink></div>
<div className="login"><NavLink exact activeClassName = "active" to="/signin">Login</NavLink></div>
<div className="logout"><NavLink exact activeClassName = "active" to="/signout" onClick={logout}>Logout</NavLink></div>

            </RightSide>
        </Container>


  );
};

export default Navbar;
const Container = styled.div`

font-family: 'Roboto Mono', monospace;
height:5rem;
width:100vw;
border-bottom:2px solid black;
display:flex;
justify-content:space-between;
align-items:center;
box-shadow:1px 0px 6px black;

@media all and (max-width:800px){
height:10rem;
flex-direction:column;
padding-bottom:1rem;
justify-content:center;
}

`


const MidCont = styled.div`
height:100%;
display:flex;
overflow:hidden;
justify-content:center;
align-items:center;
font-size:1.5rem;
img{
    width:8rem;
}
`

const RightSide = styled.div`
font-size:1.2rem;
margin-right:2rem;
display:flex;
gap:1.5rem;

@media all and (max-width:435px){
    font-size:1rem;
}

@media (max-width: 800px){
.links{
    display:none;
}
}
div{
    cursor:pointer;
    height:2rem;
}
a{
    height:100%;
    text-decoration:none;
}
.nav-toggle {
    font-size: 1.5rem;
    color: var(--clr-primary-5);
    background: transparent;
    border-color: transparent;
    transition: var(--transition);
    cursor: pointer;
  }
  .nav-toggle:hover {
    color: var(--clr-primary-1);
    transform: rotate(90deg);
  }


  @media all and (min-width:px){
    .nav-toggle {
        display: none;
      }
  }
`