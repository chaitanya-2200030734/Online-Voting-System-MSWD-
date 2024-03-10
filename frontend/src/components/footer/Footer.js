import React from 'react';
import styled from 'styled-components';

// Define the Footer component
const Footer = () => {
  return (
    <>
      <Container>
        <div className="main">
          @ Online Voting System
        </div>
      </Container>
    </>
  );
};

// Export the Footer component as the default export
export default Footer;

// Define a styled component called Container
const Container = styled.div`
  background: white;
  font-family: 'Roboto Mono', monospace;
  height: 5rem;
  width: 100vw;
  border-top: 2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 0px 6px black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
