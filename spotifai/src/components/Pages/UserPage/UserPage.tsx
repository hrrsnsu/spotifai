import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import styled from "styled-components";
const spotify = new SpotifyWebApi();

interface Props {
  token: string;
}

interface topArtists {
  items: artist[];
}

interface artist{
  name: string;
}

interface topTracks{
  items: track[];
}

interface track{
  name: string;
}

const UserPage = (_props: Props) => {
  const [topTracks, setTopTracks] = useState([] as string[]);
  const [topArtists, setTopArtists] = useState([] as string[]);

  useEffect(() => {
    spotify.getMyTopTracks({limit: 5, time_range: 'short_term'}).then((tracks) => {
      const trackObj = tracks as topTracks;
      const trackArr: string[] = [];
      trackObj.items.map((item) => {
        trackArr.push(item.name);
      })
      setTopTracks(trackArr);
    });

    spotify.getMyTopArtists({limit: 5, time_range: 'short_term'}).then((artists) => {
      const artistObj = artists as topArtists;
      const artistArr: string[] = [];
      artistObj.items.map((item) => {
        artistArr.push(item.name);
      })
      setTopArtists(artistArr);
    });

  }, []);

  console.log(topTracks);

  return (
    <div>
      <UserContainer>
        <Cards>
            <Header>Top Tracks</Header>
            <List>
              {topTracks.map((track:string, index)=> <li key={index}>{track}</li>)}
            </List>
        </Cards>
        <Cards>
        <Header>Top Artists</Header>
            <List>
              {topArtists.map((artist:string, index)=> <li key={index}>{artist}</li>)}
            </List>
        </Cards>
      </UserContainer>
      
    </div>
  );
};

export default UserPage;

const UserContainer = styled.div`
  position: absolute;
  top: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 100%;
  background-color: #1a181aff;
  box-shadow: 0px 0 10px rgba(0, 0, 0, 0.8);
`;

const Cards = styled.div`
  border-radius: 2rem;
  margin: 2rem;
  height: 70%;
  width: 40%;
  background-color: black;
  box-shadow: 0px 0 10px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  

`;

const Header = styled.h1`
  color: white;
  font-size: 1rem;
  margin: 1rem;
  text-align: center;
  text-decoration: underline;
  text-decoration-color:  #1DB954;
`
const List = styled.ul`
  color: white;

  li {
    color: white;
  }
`