import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Header from "../Molecules/Header";
import Art from "../Molecules/Art";
const spotify = new SpotifyWebApi();

interface Props {
  token: string;
}

interface topArtists {
  items: artist[];
}

interface artist {
  name: string;
}

interface topTracks {
  items: track[];
}

interface track {
  name: string;
}

const NewUserPage = (props: Props) => {
  const [topTracks, setTopTracks] = useState([] as string[]);
  const [albumArt, setAlbumArt] = useState("");
  const [artistArt, setArtistArt] = useState("");
  const [topArtists, setTopArtists] = useState([] as string[]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const makePrompt = (topTracks: string[], topArtists: string[]) => {
    const myPrompt = `A moody album cover by ${topArtists[0]} and ${topArtists[1]} but it is abstract and colorful`;

    setPrompt(myPrompt);
  };

  useEffect(() => {
    spotify
      .getMyTopTracks({ limit: 5, time_range: "short_term" })
      .then((tracks) => {
        const trackObj = tracks as topTracks;
        const trackArr: string[] = [];
        const art = tracks.items[0].album.images[0].url;
        trackObj.items.map((item) => {
          trackArr.push(item.name);
        });
        setAlbumArt(art);
        setTopTracks(trackArr);
      });

    spotify
      .getMyTopArtists({ limit: 5, time_range: "short_term" })
      .then((artists) => {
        const artistObj = artists as topArtists;
        const artistArr: string[] = [];
        const artistImage = artists.items[0].images[0].url;
        artistObj.items.map((item) => {
          artistArr.push(item.name);
        });
        setArtistArt(artistImage);
        setTopArtists(artistArr);
      });
  }, []);

  useEffect(() => {
    makePrompt(topTracks, topArtists);
  }, [topTracks, topArtists]);

  const getImage = async (e: any) => {
    setLoading(true);
    try {
      const uri = `http://${
        window.location.hostname
      }:8080/dalle?text=${encodeURI(prompt)}`;

      const resp = await axios.get(uri);

      const data = resp.data;
      setImage(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Header spotifyToken={props.token} />
      <Info>
        <Top>
          <Title>You are a major fan...</Title>
          <Text>
            {" "}
            of <strong>{topArtists[0]} </strong>and{" "}
            <strong>{topArtists[1]}</strong>. These two artists are your most
            played and will contribute to generating your art.
          </Text>
        </Top>
        <Top>
          <Title>Stuck in your head?</Title>
          <Text>
            These songs were your most played. I think you have a problem.
          </Text>
          <List>
            {topTracks.map((track: string, index) => (
              <li key={index}>{track}</li>
            ))}
          </List>
        </Top>
      </Info>
      <Art albumArt={albumArt} artistArt={artistArt} />
      <Generated>
        {!loading ? (
          <div>
            {!image ? (
              <Text>Get started by clicking the button</Text>
            ) : (
              <img
                alt="generated image"
                src={"data:image/jpeg;base64," + image}
              />
            )}
          </div>
        ) : (
          <StyledSpinner viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            />
          </StyledSpinner>
        )}
        <Button onClick={getImage}>
          {loading ? "Generating art..." : "Generate your art"}
        </Button>
      </Generated>
    </div>
  );
};

export default NewUserPage;

const Info = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 600px;
  background: rgb(195, 172, 34);
  background: radial-gradient(
    circle,
    rgba(195, 172, 34, 1) 0%,
    rgba(108, 253, 45, 1) 100%
  );
`;

const Generated = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 600px;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 50%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: bolder;
  margin-bottom: 3rem;
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  align-self: flex-start;
  list-style-position: outside;
  margin: 0;
`;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const Button = styled.a`
  display: inline-block;
  font-weight: bold;
  padding: 1rem;
  border-radius: 3rem;
  color: white;
  text-decoration: none;
  background-color: black;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: white;
    border: solid;
    color: black;
  }
`;
