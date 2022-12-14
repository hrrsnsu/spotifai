import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
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
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const makePrompt = (topTracks: string[], topArtists: string[]) => {

    const myPrompt = `Make an album cover by ${topArtists[0]} and ${topArtists[1]} using the songs ${topTracks[0]} and ${topTracks[1]} as inspiration, cartoon`;
  
    setPrompt(myPrompt);
  };

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

  useEffect(() => {
    makePrompt(topTracks, topArtists);
  }, [topTracks, topArtists]);

  const getImage = async (e: any) => {
    setLoading(true)
    try {
      const uri = `http://${window.location.hostname}:8080/dalle?text=${encodeURI(prompt)}`

      const resp = await axios.get(uri);
    
      const data = resp.data;
      setImage(data);
      setLoading(false);
   
    } catch (e) {
      console.log(e);
    }
  };

  console.log(prompt);
  console.log(loading)
  console.log(image);

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
        <button onClick={getImage}>Create the image!</button>
      <img src={"data:image/jpeg;base64," + image} />
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