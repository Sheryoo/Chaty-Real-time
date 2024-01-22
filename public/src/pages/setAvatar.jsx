import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIRoutes } from "../utils/APIRoutes";
import { Buffer } from "buffer";

function SetAvatar() {
  document.title = `Chaty - Set Avatar Page`;
  const api = "https://api.multiavatar.com/45678945";
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setsselectedAvatars] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const userToken = localStorage.getItem("jwt-token");
      const { data } = await axios.post(
        `${APIRoutes.setAvatar}`,
        { image: avatars[selectedAvatar] },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (data.status === true) {
        localStorage.setItem("isAvatarImageSet", data.status);
        localStorage.setItem("avatarImage", data.data.avatar);
        navigate("/");
      } else {
        toast.error("Error setting avatar, please try again", toastOptions);
      }
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("jwt-token")) {
      navigate("/login");
    }
    (async () => {
      const data = [];
      for (let index = 0; index < 4; index++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=${
            process.env.REACT_APP_API_KEY
          }`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data, []);
      setIsLoading(false);
    })();
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={Loader} alt="Loading" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  {
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => {
                        setsselectedAvatars(index);
                      }}
                    />
                  }
                </div>
              );
            })}
          </div>
          <button
            className="submit-btn"
            onClick={() => {
              setProfilePicture(selectedAvatar);
            }}
          >
            Set Avatar
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
export default SetAvatar;
