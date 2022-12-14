import Header from "../Molecules/Header";
import Billboard from "../Molecules/Billboard";
import React, { useEffect, useState } from "react";
import { loginUrl } from "../../secret";
import { getTokenFromUrl } from "../../secret";
import SpotifyWebApi from "spotify-web-api-js";
import styled from "styled-components";
import NewUserPage from "./UserPage";

const spotify = new SpotifyWebApi();

type Props = {};

type spotifyData = {
  access_token: string;
  token_type: string;
  expire_in: string;
};

const NewWelcomePage = (props: Props) => {
  const [spotifyToken, setSpotifyToken] = useState("");

  useEffect(() => {
    const item = getTokenFromUrl() as spotifyData;

    spotify.setAccessToken(item.access_token);

    setSpotifyToken(item.access_token);
  }, []);

  return (
    <div>
      {spotifyToken ? (
        <NewUserPage token={spotifyToken} />
      ) : (
        <Welcome>
          <Header loginUrl={loginUrl} spotifyToken={spotifyToken} />
          <Billboard loginUrl={loginUrl} />
        </Welcome>
      )}
    </div>
  );
};

export default NewWelcomePage;

const Welcome = styled.div`
`;
