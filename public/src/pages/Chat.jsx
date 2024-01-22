import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { APIRoutes } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  document.title = `Chaty - Chats Page`;
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      socket.current = io(APIRoutes.host);
      socket.current.emit("add-user", currentUser.email);
    }
  }, [currentUser]);
  useEffect(() => {
    if (!localStorage.getItem("isAvatarImageSet")) {
      navigate("/setavatar");
    }
    if (!localStorage.getItem("jwt-token")) {
      navigate("/login");
    } else {
      (async () => {
        const { data } = await axios.get(`${APIRoutes.getAllUsers}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        if (data.status === true) {
          setContacts(data.data.contancts);
          setCurrentUser(data.data.currentUser);
        }
      })();
    }
  }, []);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentUser={currentUser}
              currentChat={currentChat}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
