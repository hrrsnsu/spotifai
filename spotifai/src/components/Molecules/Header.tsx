import styled from "styled-components";
import logo from "../../images/spotify.png";

type Props = {
  loginUrl?: string;
  spotifyToken?: string;
};

const Header = (props: Props) => {
  return (
    <HeaderContainer>
      <Logo>
        <Image src={logo} />
        <Title>Spotifai</Title>
      </Logo>
      <List>
        <ListItem>
          <a href={"https://github.com/hrrsnsu"} target="_blank">
            GitHub
          </a>
        </ListItem>
        <ListItem><a href={"https://openai.com/dall-e-2/"} target="_blank">
            About
          </a></ListItem>
        <ListItem>
          <a href={props.spotifyToken ? "https://spotify.com/" : props.loginUrl}>{props.spotifyToken ? "Signed in!" : "Login"}</a>
        </ListItem>
      </List>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  padding: 1rem;
`;

const Image = styled.img`
  height: 3rem;
  width: 3rem;
`;

const Title = styled.h1`
  margin: 1rem;
  color: white;
  font-size: 1.5rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5rem;
`;

const List = styled.ul`
  margin-left: auto;
  margin-right: 5rem;
  display: flex;
`;

const ListItem = styled.li`
  color: white;
  list-style-type: none;
  margin-left: 3rem;
  &:hover {
    color: #1db954;
    transition: all 0.1s ease-in-out;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default Header;
