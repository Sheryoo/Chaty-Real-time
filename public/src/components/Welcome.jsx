import React, { useEffect, useState } from "react";
import styled from "styled-components";
import robot from "../assets/robot.gif";
function Welcome(props) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  useEffect(() => {
    if (props.currentUser) setCurrentUserName(props.currentUser.username);
  });
  return (
    <Container>
      <img src={robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUserName}</span> 👋
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 1rem;
    margin-bottom: 2rem;
    font-weight: 400;
  }
`;

export default Welcome;
