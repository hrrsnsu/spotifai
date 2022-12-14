import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../../images/spotify.png";
import { loginUrl } from "../../../secret";
import { getTokenFromUrl } from "../../../secret";
import SpotifyWebApi from "spotify-web-api-js";
import UserPage from '../UserPage/UserPage'

const spotify = new SpotifyWebApi();

type Props = {};

type spotifyData = {
  access_token: string;
  token_type: string;
  expire_in: string;
};

const WelcomePage = (props: Props) => {
  const [spotifyToken, setSpotifyToken] = useState("");

  useEffect(() => {
    const item = getTokenFromUrl() as spotifyData;

    spotify.setAccessToken(item.access_token);

    setSpotifyToken(item.access_token);
    
  }, []);

  return (
    <div>
      {spotifyToken ? (
        <UserPage token={spotifyToken}/>
      ) : (
        <WelcomeContainer>
          <Logo>
            <img style={{ height: "64px", width: "64px" }} src={logo} />
            <Title>Spotifai</Title>
          </Logo>
          <Description>
            Using your top artists, songs, and vibes, we create an AI image that
            describes what you listen to.
          </Description>
          <Button href={loginUrl}>Login</Button>
        </WelcomeContainer>
      )}
    </div>
  );
};

const WelcomeContainer = styled.div`
  position: absolute;
  top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  width: 100%;
  background-color: #1a181aff;
  box-shadow: 0px 0 10px rgba(0, 0, 0, 0.8);
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  margin: 2rem;
`;

const Title = styled.h1`
  margin: 1rem;
  color: white;
`;

const Description = styled.p`
  margin: 2rem;
  color: white;
  text-align: center;
`;

export const Button = styled.a`
  margin: 2rem;
  font-size: 1rem;
  border-radius: 2rem;
  width: 10rem;
  height: 4rem;
  background-color: white;
  text-align: center;
  line-height: 4rem;
  font-weight: 700;
  transition: background-color 0.1s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: black;
    color: white;
  }
`;
export default WelcomePage;
